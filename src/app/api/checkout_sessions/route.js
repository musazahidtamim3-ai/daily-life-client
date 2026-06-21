import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { getUserSession } from '@/lib/core/session'
import { PLAN_PRICE_ID, stripe } from '@/lib/stripe'

export async function POST(request) {
     try {
          const headersList = await headers()
          const origin = headersList.get('origin')

          const user = await getUserSession()

          if (!user) {
               return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
          }

          const formData = await request.formData()
          const planId = formData.get('planId')
          const priceId = PLAN_PRICE_ID[planId] || PLAN_PRICE_ID['premium']

          // Create Checkout Sessions from body params.
          const session = await stripe.checkout.sessions.create({
               customer_email: user?.email,
               line_items: [
                    {
                         price: priceId,
                         quantity: 1,
                    },
               ],
               mode: 'payment',
               metadata: { planId },
               success_url: `${origin}/pricing/success?session_id={CHECKOUT_SESSION_ID}`,
               cancel_url: `${origin}/pricing`,
          });

          return NextResponse.json({ url: session.url })

     } catch (err) {
          return NextResponse.json(
               { error: err.message },
               { status: err.statusCode || 500 }
          )
     }
}