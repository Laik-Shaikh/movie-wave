import React from "react";
import { useSelector } from "react-redux";
import ContentWrapper from "../../../components/container/ContentWrapper";
import Image from "../../../components/lazyImage/Image";
import Avatar from '../../../assets/avatar.png'

import './cast.scss';

const Cast = ({ data, loading }) => {

  const { url } = useSelector((state) => state.home);

  const skeleton = () => {
    return (
      <div className="skItem">
        <div className="circle skeleton"></div>
        <div className="row skeleton"></div>
        <div className="row2 skeleton"></div>
      </div>
    );
  };

  return (
    <div className="cast-section">
      <ContentWrapper>
        <div className="section-heading">Top Cast</div>
        {!loading ? (
          <div className="list-items">
            {data?.map((cast) => {
              let profileImage = cast.profile_path ? url.profile + cast.profile_path : Avatar;
              return (
                <div key={cast.id} className="list-item">
                  <div className="profile-image">
                    <Image src={profileImage} />
                  </div>
                  <div className="name">{cast.name}</div>
                  <div className="character">{cast.character}</div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="cast-skeleton">
            {skeleton()}
            {skeleton()}
            {skeleton()}
            {skeleton()}
            {skeleton()}
            {skeleton()}
          </div>
        )}
      </ContentWrapper>
    </div>
  );
};

export default Cast;
