import { html } from 'saloe/html'

import InputPassword from '@/shared/components/InputPassword'


const LoginForm = () => {
    return html`
        <form on-submit="LoginForm.submit">
            <fieldset columns="1">
                <header>
                    <inputgroup>
                        <p>AyV</p>
                        <p>·</p>
                        <p>CMS Platform</p>
                    </inputgroup>
                    <h1>Te damos la bienvenida<br/>de nuevo</h1>
                </header>
                <inputgroup>
                    <label for="email">Email</label>
                    <input type="email" id="email" name="email" placeholder="Ingresa tu email" />
                </inputgroup>
                ${
                    InputPassword()
                }
                <inputgroup>
                    <button type="submit" class="Button PrimaryButton PrimaryBlue" full-width content-center>Ingresar</button>
                    <p>¿No tienes una cuenta? Comunicate al <a class="ColorBlue" href="tel:+51918282233"><u>918282233</u></a></p>
                </inputgroup>
            </fieldset>
        </form>
    `
}

export default LoginForm