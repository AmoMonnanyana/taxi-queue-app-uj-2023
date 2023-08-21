import * as sqlite from 'sqlite';
import sqlite3 from 'sqlite3';

const  db = await sqlite.open({
    filename:  './taxi_queue.db',
    driver:  sqlite3.Database
});

await db.migrate();

export async function getQueue(){
    const sql = await db.get(`select * from taxi_queue`)
    return sql
}

export async function resetQueue() {
    const sql = `update taxi_queue set passenger_queue_count = 0, taxi_queue_count = 0`
    await db.run(sql)
}
export async function joinQueue() {
    // console.log('join queue')
    const sql = `update taxi_queue set passenger_queue_count = passenger_queue_count + 1`
    await db.run(sql)
}

export async function leaveQueue() {
   try {
    const sql = `update taxi_queue set passenger_queue_count = passenger_queue_count - 1`
    await db.run(sql)
   } catch (error) {
    console.log(error);
   }
}

export async function joinTaxiQueue() {
   const sql = `update taxi_queue set taxi_queue_count = taxi_queue_count + 1`
   await db.run(sql)
}

export async function queueLength() {
     const sql = await db.get(`select passenger_queue_count from taxi_queue`)
     return sql.passenger_queue_count
}

export async function taxiQueueLength() {
    const sql = await db.get(`select taxi_queue_count from taxi_queue`)
    return sql.taxi_queue_count
}

export async function taxiDepart() {
    const sql = `update taxi_queue set passenger_queue_count = passenger_queue_count - 12, taxi_queue_count = taxi_queue_count - 1`
    await db.run(sql)
}