import React, { Fragment } from 'react';

import { MongoClient } from 'mongodb'

import Head from 'next/head'

import MeetupList from '../components/meetups/MeetupList';

const Homepage = (props) => {

  return (
    <Fragment>
      <Head>
        <title>React Meetups</title>
        <meta name='description' content='First React Meetups'/>
      </Head>
      <MeetupList meetups={props.meetups}/>
    </Fragment>
  )
}

export async function getStaticProps() {

  const client = await MongoClient.connect('mongodb+srv:');

  const db = client.db();

  const meetupsCollection = db.collection('Meetups');

  const meetups = await meetupsCollection.find().toArray();

  client.close();

  return {
    props: {
      meetups: meetups.map(meetup => ({
        id: meetup._id.toString(),
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
      }))
    },
  }
};

export default Homepage;
