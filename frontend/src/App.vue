<template>
  <div>

    <form @submit.prevent="submitForm" class="border">
      <div class="w-25">
        <label for="email">Email:</label>
        <input type="email" v-model="email" required class="form-control" />


        <label for="number" class="mt-3">Number:</label>
        <input type="text" v-model="number" @input="formatNumber" class="form-control" />
        <div class="d-flex justify-content-end mt-3">
          <button type="submit" class="btn btn-primary ">Submit</button>

        </div>


      </div>

    </form>




    <div v-if="!loading">

      <div v-if="results.length" class="resultsContainer">
        <h3>Results:</h3>
        <ul>
          <li v-for="user in results" :key="user.email">
            <p><strong>email:</strong> {{ user.email }}</p>
            <p><strong>number:</strong> {{ user.number }}</p>
          </li>
        </ul>
      </div>


      <div v-if="error" class="d-flex justify-content-center text-danger">
        <h3>{{ error }}</h3>
      </div>

    </div>


    <div class="d-flex justify-content-center" v-else>

      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>

  </div>


</template>

<script setup>
import { ref } from 'vue';


const email = ref('');
const number = ref('');
const results = ref([]);
const error = ref(null);
const loading = ref(false);

let abortController = null;

const formatNumber = () => {
  number.value = number.value.replace(/\D/g, '').replace(/(\d{2})(?=\d)/g, '$1-');
};

const submitForm = async () => {
  loading.value = true;
  // Eski so'rovni bekor qilish
  if (abortController) {
    abortController.abort();
  }

  // Yangi AbortController yaratish
  abortController = new AbortController();
  const signal = abortController.signal;

  try {
    const response = await fetch('http://localhost:3000/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email.value,
        number: number.value.replace(/-/g, '')
      }),
      signal
    });
    if (response.status === 200) {
      loading.value = false;
      const data = await response.json();
      results.value = data;
      error.value = '';
    }
    else {
      loading.value = false;
      const errorData = await response.text();
      error.value = errorData;
      results.value = [];
    }
  } catch (err) {
    console.log(err);
  }
};



</script>

<style>
form {
  display: flex;
  flex-direction: column;
  padding: 20px;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 5px;
}

h3 {
  margin-bottom: 10px;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin-bottom: 5px;
}



.resultsContainer {
  display: flex;
  flex-direction: column;
  padding: 20px;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
}
</style>
