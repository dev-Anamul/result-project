const studentForm = document.getElementById("studentForm")
const listItem = document.getElementById("list_item")
const result = document.getElementById("result")
const viewbtn = document.getElementById("viewbtn")
const delbtn = document.getElementById("delbtn")
const customAlert = document.querySelector(".custom-alert")


// regelural Expration
let Rexname = /^[a-zA-Z\s]*$/
let REXPnumber = /^[0-9]*$/

studentForm.addEventListener("submit", function (e) {

    e.preventDefault()
    let stuName = document.querySelector("input[ placeholder='Student Name']")
    let stuRoll = document.querySelector("input[ placeholder='Roll']")
    let stuimg = document.querySelector("input[ placeholder='Image']")
    let bangla = document.querySelector("input[ placeholder='Bangla']")
    let english = document.querySelector("input[ placeholder='English']")
    let math = document.querySelector("input[ placeholder='Math']")
    let sceince = document.querySelector("input[ placeholder='Sceince']")
    let SSceince = document.querySelector("input[ placeholder='Soical-Sceince']")
    let history = document.querySelector("input[ placeholder='History']")
    let relegion = document.querySelector("input[ placeholder='Relegion']")

    let gend = document.querySelector("input[type='radio']:checked")
    let stClass = document.querySelector("#stclass")



    if (stuName.value == "" || stuRoll.value == "" || stuimg.value == "" || bangla.value == "" || english.value == "" || math.value == "" || sceince.value == "" || SSceince.value == "" || history.value == "" || relegion.value == "" || stclass.value == "") {
        result.innerHTML = `<p class="alert alert-danger">All Field Required</p>`
    } else {
        result.innerHTML = `<p class="alert alert-success"> Successful</p>`
        let result_stroge = []
        if (getdata('student_result')) {
            result_stroge = getdata('student_result');
        }

        result_stroge.push({
            name: stuName.value,
            class: stClass.value,
            roll: stuRoll.value,
            gender: gend.value,
            photo: stuimg.value,
            bangla: bangla.value,
            english: english.value,
            math: math.value,
            sceince: sceince.value,
            SSceince: SSceince.value,
            history: history.value,
            relegion: relegion.value
        })


        senddata('student_result', result_stroge)

        allresultdata()
    }


})
allresultdata()

function allresultdata() {

    let alldata = getdata('student_result');

    let allData = ""
    alldata.map((student, index) => {

        allData += `
        <tr>
        <td>${index +1}</td>
        <td>${student.name}</td>
        <td>${student.class}</td>
        <td>${student.roll}</td>
        <td>${student.gender}</td>
        <td>A</td>
        <td>4.52</td>
        <td><img style="height: 40px; width: 40px; object-fit: cover;"
                src="${student.photo}"
                alt=""></td>
        <td>
        <button class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#studentFinalResult" onclick="studentModalResult(${index})" >view</button>
        
        <button onclick ="removedata(${index})"
                class="btn btn-danger btn-sm"id="delbtn">Delete</button></td>
    </tr>
        `
    })
    listItem.innerHTML = allData;

}

function removedata(id) {

    let prom = confirm('Are You Sure')

    if (prom) {
        let alldata = getdata('student_result');
        alldata.splice(id, 1)
        senddata('student_result', alldata)
        allresultdata()
    } else {
        return false
    }

}
let stresult = new Result()

// modal function
const studentModal = document.querySelector(".student-modal")

function studentModalResult(index){

    
    let studentdata = getdata('student_result');
    studentModal.innerHTML= `
            <img class="shadow"src="${studentdata[index].photo}"alt="">
                                <h2>${studentdata[index].name}</h2>
                                <hr>
                                <table class="table table-bordered">
                                    <thead class="text-center">
                                        <tr>
                                            <th>Subject</th>
                                            <th>Mark</th>
                                            <th>GPA</th>
                                            <th>Grade</th>
                                            <th>CGPA</th>
                                            <th>Result</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Bangla</td>
                                            <td class ="text-center">${studentdata[index].bangla}</td>
                                            <td class ="text-center">${stresult.result(studentdata[index].bangla).gpacal}</td>
                                            <td class ="text-center">${stresult.result(studentdata[index].bangla).greadcal}</td>
                                            <td class ="text-center" rowspan="7"> ${stresult.finalCgpa(studentdata[index].bangla, studentdata[index].english, studentdata[index].math, studentdata[index].sceince, studentdata[index].SSceince, studentdata[index].history, studentdata[index].relegion).rescgpa}</td>
                                            <td class ="text-center" rowspan="7"> ${stresult.finalCgpa(studentdata[index].bangla, studentdata[index].english, studentdata[index].math, studentdata[index].sceince, studentdata[index].SSceince, studentdata[index].history, studentdata[index].relegion).resgread}</td>
                                            
                                        </tr>
                                        <tr>
                                            <td>English</td>
                                            <td class ="text-center">${studentdata[index].english}</td>
                                            <td class ="text-center">${stresult.result(studentdata[index].english).gpacal}</td>
                                            <td class ="text-center">${stresult.result(studentdata[index].english).greadcal}</td>
                                        </tr>
                                        <tr>
                                            <td>Math</td>
                                            <td class ="text-center">${studentdata[index].math}</td>
                                            <td class ="text-center">${stresult.result(studentdata[index].math).gpacal}</td>
                                            <td class ="text-center">${stresult.result(studentdata[index].math).greadcal}</td>
                                        </tr>
                                        <tr>
                                            <td>Sceince</td>
                                            <td class ="text-center">${studentdata[index].sceince}</td>
                                            <td class ="text-center">${stresult.result(studentdata[index].sceince).gpacal}</td>
                                            <td class ="text-center">${stresult.result(studentdata[index].sceince).greadcal}</td>
                                        </tr>
                                        <tr>
                                            <td>Soical Sceince</td>
                                            <td class ="text-center">${studentdata[index].SSceince}</td>
                                            <td class ="text-center">${stresult.result(studentdata[index].SSceince).gpacal}</td>
                                            <td class ="text-center">${stresult.result(studentdata[index].SSceince).greadcal}</td>
                                        </tr>
                                        <tr>
                                            <td>History</td>
                                            <td class ="text-center">${studentdata[index].history}</td>
                                            <td class ="text-center">${stresult.result(studentdata[index].history).gpacal}</td>
                                            <td class ="text-center">${stresult.result(studentdata[index].history).greadcal}</td>
                                        </tr>
                                        <tr>
                                            <td>Relegion</td>
                                            <td class ="text-center">${studentdata[index].relegion}</td>
                                            <td class ="text-center">${stresult.result(studentdata[index].relegion).gpacal}</td>
                                            <td class ="text-center">${stresult.result(studentdata[index].relegion).greadcal}</td>
                                        </tr>
                                    </tbody>

                                </table>
            `
    
    

}




