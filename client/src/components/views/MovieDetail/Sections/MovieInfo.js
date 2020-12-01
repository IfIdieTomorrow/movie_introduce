import React from 'react'
import {Descriptions, Badge} from 'antd';

function MovieInfo(props) {

    let {movie} = props;
    return (
        <Descriptions title="Movie Info" bordered>
            <Descriptions.Item label="제목">{movie.original_title}</Descriptions.Item>
            <Descriptions.Item label="개봉일">{movie.release_date}</Descriptions.Item>
            <Descriptions.Item label="금액">{movie.revenue}</Descriptions.Item>
            <Descriptions.Item label="상영 시간">{movie.runtime} minuate</Descriptions.Item>
            <Descriptions.Item label="평점" span={2}>
                {movie.vote_average}
            </Descriptions.Item>
            <Descriptions.Item label="투표 수">{movie.vote_count}</Descriptions.Item>
            <Descriptions.Item label="상영 상태">{movie.status}</Descriptions.Item>
            <Descriptions.Item label="총 관람객">{movie.popularity}</Descriptions.Item>
        </Descriptions>
    )
}

export default MovieInfo
