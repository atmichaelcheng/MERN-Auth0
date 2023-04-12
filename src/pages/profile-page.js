import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { CodeSnippet } from "../components/code-snippet";
import { PageLayout } from "../components/page-layout";

export const ProfilePage = () => {
  const { user } = useAuth0();
  const [activities, setActivities] = useState([]);

  /* Fetching the data from the backend and setting the state of activities to the data. */
  useEffect(() => {
    const fetchData = async () => {
      // console.log("activities returned from BE");
      try {
        // const result = await fetch(
        //   `${process.env.REACT_APP_BACKEND_URL}/activities`
        // );
        const result = await fetch(
          `http://localhost:6060/api/temp/activities`
        );
        const data = await result.json();
        console.log("data", data);
        
        setActivities(data);
        console.log("activities", activities);
      } catch (err) {
        console.log("fetchData contains error", err)
      }
    };
    fetchData();
  }, []);

  if (!user) {
    return null;
  }

  return (
    <PageLayout>
      <div className="content-layout">
        <h1 id="page-title" className="content__title">
          Profile Page
        </h1>
        <div className="content__body">
          <p id="page-description">
            <span>
              You can use the <strong>ID Token</strong> to get the profile
              information of an authenticated user.
            </span>
            <span>
              <strong>Only authenticated users can access this page.</strong>
            </span>
          </p>
          <div className="user-content">
            <h1 id="page-title" className="content__title">
              Todo List
            </h1>
            <strong>See todolist here</strong>
            <div>
              {activities && activities.length > 0 ? (
                <ol>
                  {activities.map((activity) => (
                    <li key={activity._id}>
                      {activity.name} - {activity.time}
                    </li>
                  ))}
                </ol>
              ) : (
                <p>No activities yet</p>
              )}
            </div>
          </div>
          <div className="profile-grid">
            <div className="profile__header">
              <img
                src={user.picture}
                alt="Profile"
                className="profile__avatar"
              />
              <div className="profile__headline">
                <h2 className="profile__title">{user.name}</h2>
                <span className="profile__description">{user.email}</span>
              </div>
            </div>
            <div className="profile__details">
              <CodeSnippet
                title="Decoded ID Token"
                code={JSON.stringify(user, null, 2)}
              />
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};