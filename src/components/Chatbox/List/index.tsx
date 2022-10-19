import { PropsWithChildren, useId } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import css from './style.module.css';

interface ListProps extends PropsWithChildren {
  dataLength: number;
  hasMore: boolean;
  onScroll: () => void;
}

const List = ({ dataLength, hasMore, onScroll, children }: ListProps) => {
  const id = useId();
  return (
    <div className={css.container} id={id}>
      <InfiniteScroll
        scrollableTarget={id}
        dataLength={dataLength}
        next={onScroll}
        hasMore={hasMore}
        inverse={true}
        className={css.list}
        loader={<h4 className={css.loading}>Loading...</h4>}
      >
        {children}
      </InfiniteScroll>
    </div>
  );
};

export default List;
