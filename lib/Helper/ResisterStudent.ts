import { redirect } from "next/navigation";

export async function SubmitData(e: FormData) {
    "use server";
    const data = Object.fromEntries(e.entries());
    const { name, type, email, pass1, pass2, phone } = data;
    if (name && type && email && pass1 && pass2 && phone) {
      if (pass1 == pass2) {
        const res = await fetch(`${process.env.BASE_URL}/student`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            type: data.type,
            email: data.email,
            password: data.pass1,
            name,
            phone,
            isSocialLogin: {
              status: false,
            },
          }),
        });

        const user = await res.json();
        
            return redirect(`/register?message=${user.message}&isOk=${user.isOk}`)
        
      }
    }
  }