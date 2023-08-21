import express from "express";

// use the SQL methods in the API routes below
import {getQueue, joinQueue, leaveQueue, joinTaxiQueue, queueLength, taxiQueueLength, taxiDepart, resetQueue} from './taxi.sql.js';

const app = express();

app.use(express.static('public'))

// add middleware to make post routes work
app.use(express.json());
//await taxiQueueLength()
await leaveQueue()
//await joinTaxiQueue()
//await taxiDepart()
const result = await getQueue()

const result2 = await queueLength()
const result3 = await taxiQueueLength()
console.log(result)
console.log(result2)
console.log(result3)
const PORT = process.env.PORT || 4015;



//console.log(remainingQueqe[0].passenger_queue_count)

// passenger joins the queue
app.post('/api/passenger/join', async (req, res) => {
    await joinQueue()
    res.json({
        message : 'join queue',
        
    })
})

// passenger leaves the queue


app.post('/api/passenger/leave', async (req, res) => {
    const remainingQueqe = await queueLength()

    if (remainingQueqe > 0) {
        await leaveQueue()
    }
    
    res.json({
        message : 'leave queue'
    })
});

app.post('/api/taxi/join', async (req, res) => {

    await joinTaxiQueue()
    res.json({
        message : 'leave queue'
    })
});

// Note there needs to be at least 12 people in the queue for the taxi to depart
app.post('/api/taxi/depart', async (req, res) => {
    const remainingQueqe = await getQueue()

    if(remainingQueqe.taxi_queue_count > 0 && remainingQueqe.passenger_queue_count >= 12 ) {
        await taxiDepart()
    }
    
    res.json({
        message : 'taxi depart from queue'
    })
});


// return the number of people in the queue
app.get('/api/passenger/queue', async (req, res) => {
    //  return test the API call
    const queueCount = await queueLength()
    res.json({
        queueCount
    })
});

// return the number of taxis in the queue
app.get('/api/taxi/queue', async (req, res) => {
    const queueCount = await taxiQueueLength()

    res.json({
        queueCount
    })
});

app.listen(PORT, () => console.log(`Taxi App started on port: ${PORT}`))