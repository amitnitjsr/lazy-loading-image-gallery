import React, { Component } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import NextPrevComponent from '../component/next-prev';
import Axios from 'axios';

export default class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allPhotoList: [],
            open: false,
            imageData: '',
            imageIndex: 0,
            prevDisable: false,
            nextDisable: false,
        }
    }

    componentDidMount() {
        this.getImages();
    }

    getImages = () => {
        Axios.get('https://api.unsplash.com/photos?page=' + 1 + '&per_page=' + 30 + '&client_id=P0aLUupBEEYeB6HiA7FCk33t3uhkIm9fbHxhFHzd7Tw'
        )
            .then((res) => {
                this.setState({ allPhotoList: res.data })
            })
            .catch((error) => {
                console.log('error', error)
            })
    }

    openCloseModalhandler = () => {
        this.setState({ open: !this.state.open });
    }

    clickOnPhotoHandler = (image, index) => {
        this.setState({ imageData: image, imageIndex: index }, () => {
            this.openCloseModalhandler();
        });
    }

    nextHandler = () => {
        let len = this.state.allPhotoList.length - 1;
        if (len !== this.state.imageIndex) {
            this.setState({ imageIndex: this.state.imageIndex + 1 }, () => {
                if (this.state.imageIndex < len) {
                    let image = this.state.allPhotoList.filter((val, index) => index === this.state.imageIndex);
                    if (image && image.length > 0) {
                        this.setState({ imageData: image[0].urls.small, nextDisable: false, prevDisable: false });
                    }
                }
            });
        }
        else {
            this.setState({ nextDisable: true, prevDisable: false });
        }
    }

    prevHandler = () => {
        let len = this.state.allPhotoList.length - 1;
        if (this.state.imageIndex !== 0) {
            this.setState({ imageIndex: this.state.imageIndex - 1 }, () => {
                if (this.state.imageIndex < len) {
                    let image = this.state.allPhotoList.filter((val, index) => index === this.state.imageIndex);
                    if (image && image.length > 0) {
                        this.setState({ imageData: image[0].urls.small, prevDisable: false, nextDisable: false });
                    }
                }
            });
        }
        else {
            this.setState({ prevDisable: true, nextDisable: false });
        }
    }

    render() {
        if (!this.state.allPhotoList) {
            return <h1>Images Loading...</h1>
        }
        return (
            <div>
                {this.state.allPhotoList.map((image, index) => {
                    return (
                        <LazyLoadImage
                            effect="blur"
                            src={image.urls.regular}
                            alt={image.alt_description}
                            key={image.id}
                            height="500px"
                            width="400px"
                            onClick={() => this.clickOnPhotoHandler(image.urls.regular, index)}
                            style={{ cursor: 'pointer' }}
                        />
                    )
                })}
                <NextPrevComponent
                    open={this.state.open}
                    close={this.openCloseModalhandler}
                    nextHandler={this.nextHandler}
                    prevHandler={this.prevHandler}
                    imageData={this.state.imageData}
                    prevDisable={this.state.prevDisable}
                    nextDisable={this.state.nextDisable}
                />
            </div>
        )
    }
}
