import React from "react";
import Header from "../layouts/Header";
import Footer from "../layouts/Footer";
import Contents from "../layouts/Contents";
import Loading from "../layouts/Loading";
import WrapTitle from "../layouts/WrapTitle";
import ReferInfo from "../info/ReferInfo";
import ContInfo from "../layouts/ContInfo";
import axios from "axios";

class Reference extends React.Component {
    state = {
        isLoading: true,
        refers: []
    }

    getRefer = async () => {
        const {
            data: {
                data: {htmlRefer},
            },
        } = await axios.get("https://rlozib.github.io/react99-master/src/assets/json/refer.json");
        this.setState({refers: htmlRefer, isLoading: false})

        console.log(htmlRefer);
    }

    componentDidMount(){
        setTimeout(() => {
            this.getRefer();
        }, 2000)
    }

    render(){
        const {isLoading, refers} = this.state;

        return (
            <div>
                {isLoading ? (
                    <Loading />
                ) : (
                    <div>
                        <Header />
                        <Contents>
                            <section id="referCont">
                                <div className="container">
                                    <WrapTitle text={['Reference', 'Book']} />
                                    <div className="refer__cont">
                                        <div className="table">
                                            <h3>HTML</h3>
                                            <ul>
                                                {refers.map((refer) => (
                                                    <ReferInfo 
                                                        key={refer.id}
                                                        link={refer.link}
                                                        id={refer.id}
                                                        title={refer.title}
                                                        desc1={refer.desc1}
                                                        desc2={refer.desc2}
                                                        element={refer.element}
                                                        use={refer.use}
                                                        tag={refer.tag}
                                                        version={refer.version}
                                                        view={refer.view}
                                                        definition={refer.definition}
                                                    />
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </section>
                            <ContInfo />
                        </Contents>
                        <Footer />
                    </div>
                )}
            </div>
        )
    }
}

export default Reference;