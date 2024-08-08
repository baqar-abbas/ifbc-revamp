import PageTransition from "src/Animations/PageTransition";
import Form from "../CandidateForm/Form";

const MainNewCand = () => {
  return (
    <PageTransition>
      <section className="flex flex-col w-full " id="main">
        <div
          id="rows-container"
          className="relative  place-items-center gap-5 px-5 md:px-0 "
        >
          <Form />
        </div>
      </section>
    </PageTransition>
  );
};

export default MainNewCand;
