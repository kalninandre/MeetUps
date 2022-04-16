import React, { Fragment } from 'react';
import Head from 'next/head';

import { useRouter } from 'next/router';

import NewMeetupForm from '../../components/meetups/NewMeetupForm';

const NewMeetupPage = () => {

  const router = useRouter();

  const addMeetup = async (meetupData) => {
      console.log(meetupData);
        const response = await fetch('../api/new-meetup', {
          method: 'POST',
          body: JSON.stringify(meetupData),
          headers: {
            'Content-Type': 'application/json'
          }
        })

      const data = await response.json();

      router.push('/');      
    };

  return (
    <Fragment>
      <Head>
      <title>Add New Form</title>
      </Head>
      <NewMeetupForm addMeetup={addMeetup}/>
    </Fragment>
  )
}

export default NewMeetupPage;