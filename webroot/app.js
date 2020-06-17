import { React, ReactDOM } from "https://unpkg.com/es-react/dev";
import htm from "https://cdn.pika.dev/htm";

const html = htm.bind(React.createElement);

const endPoint = "http://localhost:8080/service"

const ServicePoller = () => {
  const [services, setServices] = React.useState([]);
  const [error, setError] = React.useState(null);
  const [httResponse, setHttpResponse] = React.useState(true);
  const nameInput = React.useRef("");
  const urlInput = React.useRef("");

  const parseData = (services) => {
    const dataParsed = services.map((service) => service.status).map((status) => JSON.parse(status))
    setServices(dataParsed)
  }

  const fetchData = () => {
    fetch(endPoint)
       .then((res) => res.json())
       .then((data) => parseData(data))
       .catch(setError);
  }

  React.useEffect(() => {
    if (httResponse)
        fetchData()
  }, [httResponse]);

  React.useEffect(() => {
      if (services.length > 0)
      {
        const interval = setInterval(() => {
        fetchData()
      }, 3000)

        return () => clearInterval(interval)
      }
  }, [services]);

  const clearInputs = () => {
    nameInput.current.value = ""
    urlInput.current.value = ""
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const inputs = {
      name: nameInput.current.value,
      url: urlInput.current.value
    }

     fetch(endPoint, {
       method: "post",
       body: JSON.stringify(inputs),
     })
     .then((res) => setHttpResponse(res))
     .catch(setError);

     clearInputs();
  }

  const handleDelete = (name) => {
    fetch(endPoint, {
       method: "DELETE",
       body: JSON.stringify({ name })
    }).then((res) => setHttpResponse(res)).catch(setError);
  }

  return html`
    <main>
      <h1>KRY status poller</h1>

      ${error != null &&
        html`
          <div className="notification">${error.message}</div>
        `}

      <form className="form-inline" onSubmit=${handleSubmit}>
        <label>Name:</label>
        <input type="text" ref=${nameInput} required />

        <label>URL:</label>
        <input type="url" ref=${urlInput} required />

        <button type="submit">Save</button>
      </form>

      ${services.length > 0 &&
        html`
            <div id="countdown">
               <div id="countdown-number"></div>
               <svg>
                  <circle r="18" cx="20" cy="20"></circle>
               </svg>
            </div>
      `}

      ${services.length > 0 &&
         html`
            <p style=${{ textAlign: "right" }}>Note: Fetching data every 3 seconds.</>
         `
      }

      ${services.length > 0 &&
        html`
            <table>
                <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">URL</th>
                        <th scope="col">Status</th>
                        <th scope="col">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    ${services.map(
                        (s) => (
                            html`
                                <tr key=${s.name}>
                                    <td data-label="Name">${s.name}</td>
                                    <td data-label="URL">${s.url}</td>
                                    <td data-label="Status">${s.status}</td>
                                    <td data-label="Delete"><button className="delete" onClick=${() => handleDelete(s.name)}>Delete</button></td>
                                </tr>
                            `))
                    }

                </tbody>
            </table>
         `
      }
    </main>
  `;
};

ReactDOM.render(React.createElement(ServicePoller), document.getElementById("app"));

