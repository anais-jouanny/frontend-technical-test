import Avatar from '@/src/components/Avatar/Avatar'
import imgAvatar from '@/src/assets/avatar.webp'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import axios from 'axios';
import {Conversation} from '@/src/types/conversation'

// Vue Client
export default function Home() {
  return (
    <main>
      <ul>

        <li>
          <Avatar img={imgAvatar} text='AJ' />
          <div>
            <h2>Username</h2>
            <time dateTime='2023-03-28'>Date</time>
          </div>
        </li>

      </ul>
    </main>
  )
}


// Server
export const getServerSideProps: GetServerSideProps = async () => {
  let data = await axios.get('http://localhost:3005/conversations/1')
    .then((response) => {
      return response.data as Conversation[];
    })

  return {props: {data, message: 'test'}}
}