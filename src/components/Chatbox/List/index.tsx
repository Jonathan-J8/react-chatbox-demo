import type { PropsWithChildren } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import css from './style.module.css';

interface ListProps extends PropsWithChildren {
  dataLength: number;
  hasMore: boolean;
  scrollableId: string;
  onScroll: () => void;
}

const List = ({ dataLength, hasMore, scrollableId, onScroll, children }: ListProps) => {
  return (
    <div className={css.container} id={scrollableId}>
      <InfiniteScroll
        scrollableTarget={scrollableId}
        dataLength={dataLength}
        next={onScroll}
        hasMore={hasMore}
        inverse={true}
        style={{ display: 'flex', flexDirection: 'column-reverse', width: '100%' }} //To put endMessage and loader to the top.
        loader={<h4>Loading...</h4>}
      >
        {children}
      </InfiniteScroll>
    </div>
  );
};

export default List;
