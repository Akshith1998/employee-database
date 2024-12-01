import employeeData from "./data.json";

let selectedEmployeeId = employeeData[0]?.id;

const employeeList = document.querySelector(".employeeListWrapper");
const employeeDetails = document.querySelector(".employeeDetailsWrapper");
const addEmployeeButton = document.querySelector(".addEmployeeBtn");
const addEmployeeWrapper = document.querySelector(".formWrapper");
const employeeForm = document.querySelector(".employeeForm");

addEmployeeButton.addEventListener("click", () => {
  addEmployeeWrapper.style.display = "flex";
});

addEmployeeWrapper.addEventListener("click", (e) => {
  if (e.target.className === "formWrapper") {
    addEmployeeWrapper.style.display = "none";
  }
});

employeeForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let formData = new FormData(employeeForm);
  let emp = {};
  for (let val of formData.entries()) {
    emp[val[0]] = val[1];
  }
  employeeData.push(emp);
  renderEmployeeList();
  addEmployeeWrapper.style.display = "none";
  employeeForm.reset();
});

employeeList.addEventListener("click", (e) => {
  if (selectedEmployeeId !== parseInt(e.target.id)) {
    selectedEmployeeId = parseInt(e.target.id);
    renderEmployeeDetails();
  }
});

const renderEmployeeList = () => {
  employeeList.innerHTML = "";
  employeeData?.map((data) => {
    const employee = document.createElement("span");
    employee.classList.add("employee");
    employee.innerHTML = `${data?.firstName} ${data?.lastName}`;
    employeeList.append(employee);
    employee.setAttribute("id", data?.id);
  });
};

renderEmployeeList();

const renderEmployeeDetails = () => {
  let selectedEmployee = employeeData.find(
    (data) => data?.id === selectedEmployeeId
  );

  employeeDetails.innerHTML = "";

  const employeeName = document.createElement("div");
  employeeName.innerHTML = `${selectedEmployee?.firstName} ${selectedEmployee?.lastName}`;
  employeeName.className = "employeeDetailsName";
  employeeDetails.append(employeeName);

  const employeeEmail = document.createElement("div");
  employeeEmail.innerHTML = `${selectedEmployee?.email}`;
  employeeEmail.className = "employeeDetailsEmail";
  employeeDetails.append(employeeEmail);
};

renderEmployeeDetails();
