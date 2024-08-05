import React from 'react'

const UserStartExam = () => {
  return (
    <div class="d-flex flex-column vh-100">
  <div class="bg-primary text-white px-3 py-2 d-flex align-items-center justify-content-between">
    <div class="d-flex align-items-center gap-2">
      <h2 class="h4 font-weight-bold">Coding Fundamentals Exam</h2>
      <div class="text-small text-white-50">
        <div>Duration: 60 mins</div>
        <div>Questions: 25</div>
      </div>
    </div>
    <div class="d-flex align-items-center gap-2">
      <div class="text-small text-white-50">John Doe</div>
      <button class="btn btn-outline-light rounded-circle p-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="h-5 w-5"
        >
          <path d="M18 6 6 18"></path>
          <path d="m6 6 12 12"></path>
        </svg>
        <span class="sr-only">Close</span>
      </button>
    </div>
  </div>
  <div class="flex-grow-1 bg-light p-3 d-grid gap-3">
    <div class="bg-white p-4 rounded shadow">
      <div class="h5 font-weight-medium mb-3">What is the output of the following code?</div>
      <pre class="bg-light p-3 rounded mb-3">
        <code>const x = 5; const y = 10; console.log(x + y);</code>
      </pre>
      <div class="d-grid gap-2">
        <div class="form-check">
          <input
            class="form-check-input"
            type="radio"
            name="exampleRadios"
            id="option1"
            value="option1"
          />
          <label class="form-check-label" for="option1">
            15
          </label>
        </div>
        <div class="form-check">
          <input
            class="form-check-input"
            type="radio"
            name="exampleRadios"
            id="option2"
            value="option2"
          />
          <label class="form-check-label" for="option2">
            50
          </label>
        </div>
        <div class="form-check">
          <input
            class="form-check-input"
            type="radio"
            name="exampleRadios"
            id="option3"
            value="option3"
          />
          <label class="form-check-label" for="option3">
            -5
          </label>
        </div>
        <div class="form-check">
          <input
            class="form-check-input"
            type="radio"
            name="exampleRadios"
            id="option4"
            value="option4"
          />
          <label class="form-check-label" for="option4">
            10
          </label>
        </div>
      </div>
    </div>
  </div>
  <div class="bg-secondary px-3 py-2 d-flex justify-content-end gap-2">
    <button class="btn btn-light">Save</button>
    <button class="btn btn-primary">Submit</button>
  </div>
</div>

  )
}

export default UserStartExam