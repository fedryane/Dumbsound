import React, { useState, useContext } from "react";
import "../style/Home.css";
import LandingPage from "../components/landingpage/LandingPage";
import Cards from "../components/cards/Cards";
import { API } from "../config/api";
import { useQuery } from "react-query";
import AudioPlay from "../components/audio/AudioPlayer";
import { Navbar as NavbarMusic } from "react-bootstrap";
import PlayerMusic from "../components/audio/AudioPlayer";
import { Card, Col, Row, Button } from "react-bootstrap";
import { UserContext } from "../context/userContext";
import { Link } from "react-router-dom";
import Login from "../components/modal/Login";

function Home() {
  // handle for open login screen
  const [isClickLogin, setIsClickLogin] = useState(false);
  const handleClickLogin = () => setIsClickLogin(!isClickLogin);

  const [state] = useContext(UserContext);
  const [musicId, setMusicId] = useState("");
  console.log(musicId);

  // fetching API get all musics
  let { data: musics } = useQuery("musicsCache", async () => {
    const response = await API.get("/musics");
    console.log(response.data);
    return response.data.music;
  });

  return (
    <>
      <LandingPage />
      <h3 className="text-center my-5 title-home">Dengarkan Dan Rasakan</h3>
      <div className="d-flex gap-3 mx-4 justify-content-center">
        <Col className="mt-3 d-flex mx-5 gap-4">
          {!state.isLogin ? (
            <>
              {/* Not login */}
              {musics?.map((item) => (
                <Card className="cardThumb">
                  <div class="boxthumb" onClick={handleClickLogin}>
                    <Card.Img className="imageThumb" variant="top" src={item.thumbnail} />
                  </div>
                  <Card.Body className="cardBody">
                    <Card.Title className="titleCard">
                      <div className="boxTitle">
                        <p className="artis">{item.title}</p>
                      </div>
                      <p className="year">{item.year}</p>
                    </Card.Title>
                    <Card.Text className="textThumb">{item.artist?.name}</Card.Text>
                  </Card.Body>
                </Card>
              ))}
            </>
          ) : (
            <>
              {!state.user.subscribe ? (
                <>
                  {/* Login but not subscribed yet */}
                  {musics?.map((item) => (
                    <Card className="cardThumb" key={item.id}>
                      <Link to="/upgrade">
                        <div class="boxthumb">
                          <Card.Img className="imageThumb" variant="top" src={item.thumbnail} />
                        </div>
                      </Link>
                      <Card.Body className="cardBody">
                        <Card.Title className="titleCard">
                          <div className="boxTitle">
                            <p className="artis">{item.title}</p>
                          </div>
                          <p className="year">{item.year}</p>
                        </Card.Title>
                        <Card.Text className="textThumb">{item.artist?.name}</Card.Text>
                      </Card.Body>
                    </Card>
                  ))}
                </>
              ) : (
                <>
                  {/*Login subscribed */}
                  {musics?.map((item) => (
                    <Card className="cardThumb">
                      <div class="boxthumb" onClick={() => setMusicId(item)}>
                        <Card.Img className="imageThumb" variant="top" src={item.thumbnail} />
                      </div>
                      <Card.Body className="cardBody">
                        <Card.Title className="titleCard">
                          <div className="boxTitle">
                            <p className="artis">{item.title}</p>
                          </div>
                          <p className="year">{item.year}</p>
                        </Card.Title>
                        <Card.Text className="textThumb">{item.artist?.name}</Card.Text>
                      </Card.Body>
                    </Card>
                  ))}
                </>
              )}
            </>
          )}
        </Col>

        {musicId === "" ? (
          <></>
        ) : (
          <NavbarMusic className="fixed-bottom">
            <PlayerMusic musicId={musicId} />
          </NavbarMusic>
        )}
      </div>

      {isClickLogin ? <Login isOpen={isClickLogin} /> : null}
    </>
  );
}

export default Home;

//   {musics?.map((item, index) => {
//   return <Cards item={item} key={index} />;
// })}

// <Card className="cardThumb">
// <div class="boxthumb" onClick={() => setMusicId(item)}>
//   <Card.Img className="imageThumb" variant="top" src={item.thumbnail} />
// </div>
// <Card.Body className="cardBody">
//   <Card.Title className="titleCard">
//     <div className="boxTitle">
//       <p className="artis">{item.title}</p>
//     </div>
//     <p className="year">{item.year}</p>
//   </Card.Title>
//   <Card.Text className="textThumb">{item.artist?.name}</Card.Text>
// </Card.Body>
// </Card>

// <Col lg="2" md="6" sm="4" className="mt-3">
// {!state.isLogin ? (
//   <>
//     {musics?.map((item) => (
//       <Card className="cardThumb">
//         <div class="boxthumb">
//           <Card.Img className="imageThumb" variant="top" src={item.thumbnail} />
//         </div>
//         <Card.Body className="cardBody">
//           <Card.Title className="titleCard">
//             <div className="boxTitle">
//               <p className="artis">{item.title}</p>
//             </div>
//             <p className="year">{item.year}</p>
//           </Card.Title>
//           <Card.Text className="textThumb">{item.artist?.name}</Card.Text>
//         </Card.Body>
//       </Card>
//     ))}
//   </>
// ) : (
//   <>
//     {!state.isAdmin ? (
//       <>
//         {musics?.map((item) => (
//           <Card className="cardThumb">
//             <div class="boxthumb" onClick={() => setMusicId(item)}>
//               <Card.Img className="imageThumb" variant="top" src={item.thumbnail} />
//             </div>
//             <Card.Body className="cardBody">
//               <Card.Title className="titleCard">
//                 <div className="boxTitle">
//                   <p className="artis">{item.title}</p>
//                 </div>
//                 <p className="year">{item.year}</p>
//               </Card.Title>
//               <Card.Text className="textThumb">{item.artist?.name}</Card.Text>
//             </Card.Body>
//           </Card>
//         ))}
//       </>
//     ) : (
//       <></>
//     )}
//   </>
// )}
// </Col>

// {musicId === "" ? (
// <></>
// ) : (
// <NavbarMusic className="fixed-bottom">
//   <PlayerMusic musicId={musicId} />
// </NavbarMusic>
// )}
