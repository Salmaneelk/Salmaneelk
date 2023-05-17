// find the form and create the event listener
const myform = document.getElementById('formID');
myform.addEventListener('submit', handleForm);

// find tbody using the table id, and find its rows
const tbody = document.querySelector('#mytable tbody');
const rows = tbody.getElementsByTagName('tr')


// create the method that handle our form submittion
function handleForm(event){

    // prevent refreshing when submitted
    event.preventDefault();

    // create new row each time 
    const newRow = document.createElement('tr');

    // Access the data using event object and changing its form to Array 
    const formData = new FormData(event.target);
    const formEntries = Array.from(formData.entries());

    // for (const [name, value] of formEntries){
    //     console.log(name, value);
    // }

    
    // create new column for each line of data, assign the value of th data to the column, append the column to the row we just created
    formEntries.forEach(item => {
        const value = document.createElement('td');
        // console.log(item[1]);
        value.textContent = item[1];
        newRow.appendChild(value);
    });

    // append the row to the tbody and reset the form
    tbody.appendChild(newRow);
    myform.reset();
}

// finding and creating event handlers for the checkboxes
const elderycheckbox = document.getElementById('chkElderlyPatients');
const patientcheckbox = document.getElementById('chkShowOutPatients');
elderycheckbox.addEventListener('change', handleElderyCheck);
patientcheckbox.addEventListener('change', handlePatientCheck);


// create the method that handle the eldery check box
function handleElderyCheck(event){
    // create the date of 25 years ago
    const currentDate = new Date();
    const comparisonDate = new Date(currentDate.getFullYear() - 65, currentDate.getMonth(), currentDate.getDate());

    // box checked
    if (event.target.checked) {
        for (let i = 0; i < rows.length; i++) {
                // get value of date in each row
                const cells = rows[i].getElementsByTagName('td');
                const inputDate = new Date(cells[4].innerText);

                // compare to date-65
                if (inputDate > comparisonDate) {
                    // hide row
                    rows[i].style.display = 'none';
                }     
            }
    }

    // unchecked box
    if (!event.target.checked){
        for (let i = 0; i < rows.length; i++) {
            // show all rows
            rows[i].style.display = 'table-row';
                }     
        }
} 


// create the method that handle the patient check box (same logic as above)
function handlePatientCheck(event){
    if (event.target.checked){
        for (let i = 0; i < rows.length; i++) {
            if (rows[i].getElementsByTagName('td')[6].innerText == "No"){
                rows[i].style.display = 'none';
            }

        }
    }
    if (!event.target.checked){
        for (let i = 0; i < rows.length; i++) {
            // show all rows
            rows[i].style.display = 'table-row';
                }     
        }

}