import FetchService from './service/FetchService';

const fetchService = new FetchService();
/*-- /Objects --*/

/*--Functions--*/
async function submitForm(e, form) {
    // 1. Prevent reloading page
    e.preventDefault();
    // 2. Submit the form
    // 2.1 User Interaction
    const btnSubmit = document.getElementById('btnSubmit');
    btnSubmit.disabled = true;
    setTimeout(() => btnSubmit.disabled = false, 2000);
    // 2.2 Build JSON body
    const jsonFormData = buildJsonFormData(form);
    // 2.3 Build Headers
    const headers = buildHeaders();
    // 2.4 Request & Response
    const response = await fetchService.performPostHttpRequest(`http://localhost:8080/students`, headers, jsonFormData); 
    // 2.5 Inform user of result
    if(response)
        window.location.reload(true);
    else
        alert(`An error occured.`);
}

function buildHeaders() {
    const headers = {
        "Content-Type": "application/json",
    };
    return headers;
}

function buildJsonFormData(form) {
    const jsonFormData = { };
    for(const pair of new FormData(form)) {
        jsonFormData[pair[0]] = pair[1];
    }
    return jsonFormData;
}
/*--/Functions--*/
// 1) Fetch data from remote API
async function getStudents() {
    try {
      const response = await fetch(
        'http://localhost:8080/students',
        {
          method: 'GET',
        },
      );

      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
      }

      const responseJson = await response.json();

      return responseJson;
    } catch (error) {
      console.log(error);
    }
  }

  // 2) Render the data in your HTML
  getStudents().then(json => {

    const ol = document.createElement('ol');

    json.data.forEach(student => {
      const li = document.createElement('li');
      li.innerHTML = student.name + "&nbsp&nbsp&nbsp Grade " + student.grade;

      li.style.fontSize = '22px';

      ol.appendChild(li);
    });

    const container = document.getElementById('json-data');
    container.appendChild(ol);
  });

/*--Event Listeners--*/
const sampleForm = document.querySelector("#sampleForm");
if(sampleForm) {
    sampleForm.addEventListener("submit", function(e) {
        submitForm(e, this);
    });
}
