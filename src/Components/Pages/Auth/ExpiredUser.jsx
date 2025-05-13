
import { Typewriter } from "react-simple-typewriter";
import PagesIndex from "../PagesIndex";

const ExpiredUser = () => {
  return (
    <div id="main_404">
      <div class="fof">
        <div className="d-flex flex-column">
          <div className="fs-5 my-3">
            <Typewriter
              words={["Your Session Has Expired"]}
              loop={5}
              cursor
              cursorStyle="!"
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={1000}
            />
          </div>
          <div>
            <PagesIndex.Link to={"/"} replace={true} className="btn btn-primary submitBtn">
              <PagesIndex.Icon icon="line-md:plus" /> Login Again
            </PagesIndex.Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpiredUser;
