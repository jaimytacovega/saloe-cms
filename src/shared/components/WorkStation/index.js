import { html } from 'saloe/html'


const WorkStation = ({
    header,
    toolbox,
    table,
    form,
}) => {
    return html`
        <container class="WorkStation__container">
        <section class="WorkStation">
          <header>
            ${header}
          </header>
          ${
            Boolean(toolbox) && html`
              <div class="WorkStation__toolbox">
                ${toolbox}
              </div>
            `
          }
          <div class="WorkStation__table">
            ${table}
          </div>
          ${
            Boolean(form) 
              ? html`
                <div class="WorkStation__form">
                    ${form}
                </div>
              ` : ''
          }
        </section>
    </container>
    `
}

export default WorkStation