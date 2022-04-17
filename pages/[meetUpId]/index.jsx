import React, { Fragment } from 'react';
import Head from 'next/head';

import { MongoClient, ObjectId } from 'mongodb';

import MeetupDetail from '../../components/meetups/MeetupDetails';

const MeetupDetails = (props) => {
  return (
    <Fragment>
      <Head>
        <title>{props.data.title}</title>
        <meta name='description' content={props.data.description}/>
      </Head>
      <MeetupDetail 
      image={props.data.image}
      title={props.data.title}
      address={props.data.address}
      description={props.data.description}
      />
   </Fragment>
  )
}

export async function getStaticPaths() {
  const client = await MongoClient.connect('mongodb+srv:');

  const db = client.db();

  const meetupsCollection = db.collection('Meetups');

  const meetups = await meetupsCollection.find({}, {_id: 1}).toArray();

  client.close();

  return {
    fallback: 'blocking',
    paths: meetups.map(meetup => ({
      params: {
        meetUpId: meetup._id.toString(),
      }
    }))
  }
}

export async function getStaticProps(context) {

  const meetUpId = context.params.meetUpId;

  const client = await MongoClient.connect('mongodb+srv:');

  const db = client.db();

  const meetupsCollection = db.collection('Meetups');

  const selectedMeetupId = await meetupsCollection.findOne({ _id:ObjectId(meetUpId) })

  client.close();

  return {
    props: { 
      data: {
        id: selectedMeetupId._id.toString(),
        title: selectedMeetupId.title,
        address: selectedMeetupId.address,
        image: selectedMeetupId.image,
        description: selectedMeetupId.description,
      }
    }
  }
}

export default MeetupDetails
