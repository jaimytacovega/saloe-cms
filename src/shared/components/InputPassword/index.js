import { html } from 'saloe/html'


const InputPassword = () => {
    return html`
        <inputgroup>
            <label for="password">Contraseña</label>
            <inputgroup>
                <input type="password" id="password" name="password" placeholder="Ingresa tu contraseña" password/>
                <button 
                    type="button" 
                    class="Button PrimaryButton" 
                    open="true"

                    on-click="InputPasswordButton.click"
                >
                    <img src="/img/icon/eye-black.svg" width="20" height="20" alt="eye">
                    <img src="/img/icon/eye-off-black.svg" width="20" height="20" alt="eye">
                </button>
            </inputgroup>
        </inputgroup>
    `
}

export default InputPassword