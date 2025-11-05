import { supabase } from './supabase';

export interface WaitlistData {
  productId: string;
  email: string;
  name?: string;
  company?: string;
  useCase?: string;
}

export interface WaitlistResponse {
  success: boolean;
  message: string;
  alreadySignedUp?: boolean;
}

export async function addToWaitlist(data: WaitlistData): Promise<WaitlistResponse> {
  try {
    const { email, productId, name, company, useCase } = data;

    if (!email || !productId) {
      return {
        success: false,
        message: 'Email and product ID are required'
      };
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return {
        success: false,
        message: 'Please enter a valid email address'
      };
    }

    const { data: existingSignup, error: checkError } = await supabase
      .from('waitlist_signups')
      .select('id')
      .eq('product_id', productId)
      .eq('email', email)
      .maybeSingle();

    if (checkError && checkError.code !== 'PGRST116') {
      throw checkError;
    }

    if (existingSignup) {
      return {
        success: true,
        message: "You're already on the waitlist!",
        alreadySignedUp: true
      };
    }

    const { error: insertError } = await supabase
      .from('waitlist_signups')
      .insert({
        product_id: productId,
        email: email.toLowerCase().trim(),
        name: name?.trim() || null,
        company: company?.trim() || null,
        use_case: useCase?.trim() || null
      });

    if (insertError) {
      if (insertError.code === '23505') {
        return {
          success: true,
          message: "You're already on the waitlist!",
          alreadySignedUp: true
        };
      }
      throw insertError;
    }

    return {
      success: true,
      message: 'Successfully joined the waitlist!'
    };
  } catch (error) {
    console.error('Waitlist error:', error);
    return {
      success: false,
      message: 'Failed to join waitlist. Please try again.'
    };
  }
}

export async function getWaitlistCount(productId: string): Promise<number> {
  try {
    const { count, error } = await supabase
      .from('waitlist_signups')
      .select('*', { count: 'exact', head: true })
      .eq('product_id', productId);

    if (error) throw error;
    return count || 0;
  } catch (error) {
    console.error('Error getting waitlist count:', error);
    return 0;
  }
}
