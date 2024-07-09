const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

const users = [
  { email: 'jim@gmail.com', number: '221122' },
  { email: 'jam@gmail.com', number: '830347' },
  { email: 'john@gmail.com', number: '221122' },
  { email: 'jams@gmail.com', number: '349425' },
  { email: 'jams@gmail.com', number: '141424' },
  { email: 'jill@gmail.com', number: '822287' },
  { email: 'jill@gmail.com', number: '822286' },
];

app.post('/search', (req, res) => {
  const { email, number } = req.body;
  setTimeout(() => {
    const result = users.filter(user => {
      const emailMatch = user.email === email;
      const numberMatch = number ? user.number === number : true;
      return emailMatch && numberMatch;
    });

    if (result.length > 0) {
      res.status(200).json(result);
    } else {
      res.status(404).send('No users found');
    }
  }, 5000); 
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
