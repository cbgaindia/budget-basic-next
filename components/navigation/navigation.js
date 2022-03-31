import Link from 'next/link';

function romanizeNumber (num) {
  if (isNaN(num))
      return NaN;
  var digits = String(+num).split(""),
      key = ["","C","CC","CCC","CD","D","DC","DCC","DCCC","CM",
             "","X","XX","XXX","XL","L","LX","LXX","LXXX","XC",
             "","I","II","III","IV","V","VI","VII","VIII","IX"],
      roman = "",
      i = 3;
  while (i--)
      roman = (key[+digits.pop() + (i * 10)] || "") + roman;
  return Array(+digits.join("") + 1).join("M") + roman;
}

const Navigation = ({ back, forward, currentchapter = 4, isHindi = false }) => (
  // <footer className="navigation">
  //   <div className="navigation__container wrapper">
  //     <section className="navigation__section">
  //       {back != undefined && (
  //         <Link href={`/${back.slug}`}>
  //           <a className="navigation__button navigation__button--back">
  //             <img src="assets/icons/arrowBack.svg" alt="" />
  //             <span>
  //               <p>go back to:</p>
  //               <h2>{back.Title}</h2>
  //             </span>
  //           </a>
  //         </Link>
  //       )}
  //     </section>

  //     <section className="navigation__section">
  //       {forward != undefined && (
  //         <>
  //           <Link href={`/${forward.slug}`}>
  //             <a className="navigation__button navigation__button--forward">
  //               <img src="assets/icons/arrowBack.svg" alt="" />
  //               <span>
  //                 <p>read next:</p>
  //                 <h2>{forward.Title}</h2>
  //               </span>
  //             </a>
  //           </Link>
  //         </>
  //       )}
  //     </section>
  //   </div>
  // </footer>
  <section className="fowrdard_and_backward_container">
    <div className="wrapper">
      <div className={`naviagetion_container_new ${currentchapter === 1 ? 'align-item-right' : currentchapter === 12 ? 'align-item-left' : '' }`} > 
      {back != undefined && (
        <div className="new_pre_chaper">
            <Link href={isHindi ? `/hn/${back.slug}` : `/${back.slug}`}>
              <a className="navigation__button_new navigation__button_new--back">
                <div className="navaigation_img">
                    <div className="chapter_page_roam_navigation_page">
                        <p>{romanizeNumber(back.Chapter_No)}</p>
                      </div>
                  <img className="image_pre_next_navigation" src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${back.icon.url}`} alt="" />
                </div>
                <span>
                  <p>{isHindi ? 'पूर्व खंड' : 'Previous Section'}</p>
                  <h2>{isHindi ? back.TitleHindi : back.Title}</h2>
                </span>
              </a>
            </Link>
            </div>
          )}

          {forward != undefined && (
             <div className="new_next_chaper">
              <Link href={isHindi ? `/hn/${forward.slug}` : `/${forward.slug}` }>
              <a className="navigation__button_new navigation__button_new--forward">
                <div className="navaigation_img">
                    <div className="chapter_page_roam_navigation_page">
                        <p>{romanizeNumber(forward.Chapter_No)}</p>
                      </div>
                  <img className="image_pre_next_navigation" src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${forward.icon.url}`} alt="" />
                </div>
                <span>
                  <p>{isHindi ? 'अगला खंड' : 'Next Section'}</p>
                  <h2>{isHindi ? forward.TitleHindi : forward.Title}</h2>
                </span>
              </a>
              </Link>
            </div>
          )}
      </div>
    
    </div>
  </section>
);

export default Navigation;
