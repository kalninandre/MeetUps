import { MongoClient } from 'mongodb';

async function NewMeetupHandler(req, res) {
    if (req.method === 'POST') {
        const data = req.body;

        const client = await MongoClient.connect(
            process.env.REACT_APP_MONGODB_KEY
        );

        const db = client.db('MeetUps');

        const meetupsCollection = db.collection('Meetups');

        const result = await meetupsCollection.insertOne(data);

        console.log(result);

        client.close();

        res.status(201).json({ message: 'Inserted!' });
    }
}

export default NewMeetupHandler;
