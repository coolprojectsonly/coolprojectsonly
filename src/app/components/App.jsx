"use client";
import React, { useState } from "react";
import languages from "./languages";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "./createReducer";
import { easeInOut, motion, useAnimation } from "framer-motion";

function App() {
  const dispatch = useDispatch();
  const textareaControls = useAnimation();
  const textareaControls2 = useAnimation();
  const textareaControls3 = useAnimation();

  const [selectedLanguage, setSelectedLanguage] = useState("");

  const status = useSelector((state) => state.post.status);
  const translation = useSelector((state) => state.post.data);
  const error = useSelector((state) => state.post.error);

  const [text, setText] = useState("");

  // useEffect(() => {
  //   dispatch(
  //     fetchData({
  //       code: selectedLanguage,
  //       text: "What is your name?",
  //     })
  //   );
  // }, [dispatch]);

  const handleLanguageChange = (event) => {
    setSelectedLanguage(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(
      fetchData({
        code: selectedLanguage,
        text,
      })
    );
    // console.log(translation?.data?.translatedText);
    // console.log(selectedLanguage);
  };

  const handleTextarea2 = async () => {
    await textareaControls2.start({
      scale: 0.97,
      transition: {
        ease: easeInOut,
        duration: 0.1,
      },
    });

    await textareaControls2.start({
      scale: 1,
      transition: {
        ease: easeInOut,
        duration: 0.1,
      },
    });
  };

  const handleTextarea3 = async () => {
    await textareaControls3.start({
      scale: 0.97,
      transition: {
        ease: easeInOut,
        duration: 0.1,
      },
    });

    await textareaControls3.start({
      scale: 1,
      transition: {
        ease: easeInOut,
        duration: 0.1,
      },
    });
  };

  const handleTextarea = async () => {
    await textareaControls.start({
      scale: 0.97,
      transition: {
        ease: easeInOut,
        duration: 0.1,
      },
    });

    await textareaControls.start({
      scale: 1,
      transition: {
        ease: easeInOut,
        duration: 0.1,
      },
    });
  };

  // console.log(translation.status);

  if (status === "Loading") {
    return <h1>Translating..</h1>;
  }

  if (status === "error") {
    return <h1>Something went wrong:{error}</h1>;
  }

  return (
    <div
      style={{
        background: "#fffff0",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <h1>Text Translator API</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              // justifyContent: "center",
              width: "99vw",
            }}
          >
            <motion.select
              value={selectedLanguage}
              onChange={handleLanguageChange}
              style={{
                width: "220px",
                height: "40px",
                listStyle: "none",
                marginLeft: "6vw",
                marginRight: "26vw",
              }}
            >
              <option
                value=""
                style={{
                  listStyle: "none",
                  overflow: "hidden",
                }}
              >
                Choose Language...
              </option>
              {languages.map((language) => (
                <option key={language.code} value={language.code}>
                  {language.name}
                </option>
              ))}
            </motion.select>

            <motion.button
              onMouseOver={handleTextarea3}
              animate={textareaControls3}
              type="submit"
            >
              Translate
            </motion.button>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            width: "100vw",
          }}
        >
          <div
            className="textareaContainer"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "99vw",
              height: "40vh",
              borderRadius: "10px",
            }}
          >
            <motion.textarea
              style={{
                width: "40vw",
                height: "30vh",
                marginRight: "40px",
                marginTop: 0,
                borderRadius: "10px",
                fontSize: "30px",
              }}
              onChange={(e) => setText(e.target.value)}
              placeholder="Type text for translation here..."
              initial={{ scale: 1 }}
              onMouseEnter={handleTextarea2}
              animate={textareaControls2}
            ></motion.textarea>
            <motion.textarea
              style={{
                width: "40vw",
                height: "30vh",
                marginRight: "40px",
                marginTop: 0,
                borderRadius: "10px",
                fontSize: "30px",
              }}
              placeholder="Translation..."
              initial={{ scale: 1 }}
              onMouseEnter={handleTextarea}
              animate={textareaControls}
            >
              {translation?.data?.translatedText}
            </motion.textarea>
          </div>
        </div>
      </form>
      {/* {translation.status === "success" && (
        <h1>Translated word is {translation?.data?.translatedText}</h1>
      )} */}
    </div>
  );
}

export default App;
