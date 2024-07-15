import type { ProsYcosResponse } from "app/interfaces";
import { environment } from "environments/environment.development";

export const prosConsUseCase = async (prompt: string) => {
  try {
    const resp = await fetch(`${environment.backendApi}/pros-cons-discusser`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({ prompt })
    });

    if (!resp.ok) throw new Error('No se pudo realizar la comparación');

    const data = await resp.json() as ProsYcosResponse;
    console.log({gptr:data})
    return {
      ok: true,
      ...data,
    };

  } catch (error) {
    console.error(error);
    return {
      ok: false,
      rol: '',
      content: 'No se pudo realizar la comparación'
    };
  }
}
