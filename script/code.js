let peopleData = [];

    // Fetch random people data
    async function fetchRandomPeople() {
      const response = await fetch('https://randomuser.me/api/?results=20');
      const data = await response.json();
      peopleData = data.results;
      displayPeople();
    }

    // Display people in the UI
    function displayPeople() {
      const peopleContainer = document.getElementById('peopleContainer');
      peopleContainer.innerHTML = '';

      if (peopleData.length === 0) {
        document.getElementById('errorMessage').innerText = 'No data available.';
        return;
      }

      peopleData.forEach(person => {
        const personElement = document.createElement('div');
        personElement.classList.add('person');
        personElement.innerText = `${person.name.first} ${person.name.last}`;
        peopleContainer.appendChild(personElement);
      });

      document.getElementById('errorMessage').innerText = '';
    }

    // Filter people based on the search input
    function filterPeople() {
      const searchInput = document.getElementById('searchInput').value.toLowerCase();

      if (!searchInput) {
        displayPeople();
        return;
      }

      const filteredPeople = peopleData.filter(person =>
        person.name.first.toLowerCase().includes(searchInput)
      );

      if (filteredPeople.length === 0) {
        document.getElementById('errorMessage').innerText = 'Name not found.';
      } else {
        document.getElementById('errorMessage').innerText = '';
      }

      peopleData = filteredPeople;
      displayPeople();
    }

    // Toggle sorting order
    function toggleSorting() {
      peopleData.reverse();
      displayPeople();
    }

    // Fetch random people data on page load
    fetchRandomPeople();

    // Attach event listener to the search input
    document.getElementById('searchInput').addEventListener('input', filterPeople);