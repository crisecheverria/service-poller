import { React, ReactDOM } from "https://unpkg.com/es-react/dev";
import htm from "https://cdn.pika.dev/htm";

const html = htm.bind(React.createElement);

const endPoint = "http://localhost:8080/service"

const ServicePoller = () => {
  const [services, setServices] = React.useState([]);
  const [error, setError] = React.useState(null);
  const [httResponse, setHttpResponse] = React.useState("");

  const parseData = (services) => {
    const dataParsed = services.map((service) => service.status).map((status) => JSON.parse(status))
    setServices(dataParsed)
  }

  React.useEffect(() => {
    fetch(endPoint)
      .then((res) => res.json())
      .then((data) => parseData(data))
      .catch(setError);
  }, [httResponse]);

  const handleSubmit = (e) => {
    e.preventDefault()

    const inputs = {
      name: document.getElementById("name-input").value,
      url: document.getElementById("url-input").value
    }

     fetch(endPoint, {
       method: "post",
       body: JSON.stringify(inputs),
     }).then((res) => setHttpResponse(res.statusText))
  }

  return html`
    <main>
      <h1>KRY status poller</h1>

      ${error != null &&
        html`
          <div style=${{ color: "red" }}>${error.message}</div>
        `}

      <form className="form-inline" onSubmit=${handleSubmit}>
        <label>Name:</label>
        <input type="text" id="name-input" />

        <label>URL:</label>
        <input type="url" id="url-input" />

        <button type="submit">Save</button>
      </form>


      ${services &&
        html`
            <table>
                <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">URL</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    ${services.map(
                        (s) => (
                            html`
                                <tr key=${s.name}>
                                    <td data-label="Name">${s.name}</td>
                                    <td data-label="URL">${s.url}</td>
                                    <td data-label="Actions">Update</td>
                                </tr>
                            `))
                    }

                </tbody>
            </table>`
      }
    </main>
  `;
};

ReactDOM.render(React.createElement(ServicePoller), document.getElementById("app"));

