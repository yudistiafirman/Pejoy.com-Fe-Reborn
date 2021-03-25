import React, { Component } from "react";
import axios from "axios";

class ScrollComponent extends Component {
    state = {
      photos: [],
      loading: false,
      page: 0,
      prevY: 0
    };

    componentDidMount(){
        this.getPhotos(this.state.page);

        var options = {
            root: null,
            rootMargin: "0px",
            threshold: 1.0
        };
          
        this.observer = new IntersectionObserver(
            this.handleObserver.bind(this),
            options
        );
        
        this.observer.observe(this.loadingRef);
    }

    getPhotos(page) {
        this.setState({ loading: true });
        axios
        .get(
            `https://jsonplaceholder.typicode.com/photos?_page=${page}&_limit=10`
        )
        .then(res => {
            this.setState({ photos: [...this.state.photos, ...res.data] });
            this.setState({ loading: false });
        });
    }

    handleObserver(entities, observer) {
        const y = entities[0].boundingClientRect.y;
        if (this.state.prevY > y) {
          const lastPhoto = this.state.photos[this.state.photos.length - 1];
          const curPage = lastPhoto.albumId;
          this.getPhotos(curPage);
          this.setState({ page: curPage });
        }
        this.setState({ prevY: y });
    }

  render() {
    return (
        <div className="container">
            <div style={{ minHeight: "800px" }}>
            {this.state.photos.map(user => (
                <img src={user.url} height="100px" width="200px" />
            ))}
            </div>
            <div
            ref={loadingRef => (this.loadingRef = loadingRef)}
            >
            <span>Loading...</span>
            </div>
        </div>
    );
  }
}

export default ScrollComponent;