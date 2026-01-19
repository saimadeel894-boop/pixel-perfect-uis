import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const authHeader = req.headers.get('Authorization')
    if (!authHeader?.startsWith('Bearer ')) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY')!

    // Create client with user's token to verify identity
    const userClient = createClient(supabaseUrl, supabaseAnonKey, {
      global: { headers: { Authorization: authHeader } }
    })

    const token = authHeader.replace('Bearer ', '')
    const { data: claimsData, error: claimsError } = await userClient.auth.getClaims(token)
    
    if (claimsError || !claimsData?.claims) {
      return new Response(
        JSON.stringify({ error: 'Invalid token' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const userId = claimsData.claims.sub

    // Parse request body
    const { role, target_user_id } = await req.json()

    // Validate role
    const validRoles = ['admin', 'coach', 'client']
    if (!validRoles.includes(role)) {
      return new Response(
        JSON.stringify({ error: 'Invalid role' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Create service client for privileged operations
    const serviceClient = createClient(supabaseUrl, supabaseServiceKey)

    // If target_user_id is provided, check if current user is admin
    if (target_user_id && target_user_id !== userId) {
      const { data: adminCheck } = await serviceClient
        .from('user_roles')
        .select('role')
        .eq('user_id', userId)
        .eq('role', 'admin')
        .maybeSingle()

      if (!adminCheck) {
        return new Response(
          JSON.stringify({ error: 'Only admins can assign roles to other users' }),
          { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
      }
    }

    const targetUserId = target_user_id || userId

    // Check if user already has a role (for self-assignment during signup)
    if (!target_user_id) {
      const { data: existingRole } = await serviceClient
        .from('user_roles')
        .select('role')
        .eq('user_id', targetUserId)
        .maybeSingle()

      if (existingRole) {
        return new Response(
          JSON.stringify({ error: 'Role already assigned. Contact admin to change.' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
      }
    }

    // Assign the role
    const { error: insertError } = await serviceClient
      .from('user_roles')
      .upsert({ 
        user_id: targetUserId, 
        role: role 
      }, { 
        onConflict: 'user_id,role' 
      })

    if (insertError) {
      console.error('Error assigning role:', insertError)
      return new Response(
        JSON.stringify({ error: 'Failed to assign role' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Create coach or client record based on role
    if (role === 'coach') {
      const { error: coachError } = await serviceClient
        .from('coaches')
        .upsert({ user_id: targetUserId }, { onConflict: 'user_id' })
      
      if (coachError) {
        console.error('Error creating coach record:', coachError)
      }
    } else if (role === 'client') {
      const { error: clientError } = await serviceClient
        .from('clients')
        .upsert({ user_id: targetUserId }, { onConflict: 'user_id' })
      
      if (clientError) {
        console.error('Error creating client record:', clientError)
      }
    }

    return new Response(
      JSON.stringify({ success: true, role }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('Unexpected error:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})