import { FilterX, Search } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import { Button } from './ui/button';
import PostFilterForm from './forms/PostFilterForm';
import { useRef, useState } from 'react';
import FilterPostResults from './FilterPostResults';
import { useFilterPosts } from '~/hooks/useFilterPosts';
import { useLoaderData } from '@remix-run/react';
import { TrendingPost } from '~/types/blog-types';
import { FilterPost } from '~/validations/post.validation';

const FilteredPosts = () => {
  const formRef = useRef<HTMLFormElement | null>(null);
  const [values, setValues] = useState<FilterPost>({
    title: '',
    category: [],
    tag: [],
  });

  const { trendingPosts } = useLoaderData<{ trendingPosts: TrendingPost[] }>();

  const [form, mutation] = useFilterPosts(values, trendingPosts);
  const data = mutation.data.pages.flatMap((page) => page);

  return (
    <div className='w-full space-y-12'>
      <Accordion
        type='single'
        defaultValue='item-1'
        className='relative w-full rounded-md bg-muted/60 px-5'
      >
        <div className='absolute right-5 top-3 space-x-2'>
          <Button
            onClick={() => {
              mutation.resetQueryState();
              form.reset();
            }}
            size='icon'
            variant='ghost'
            className='h-fit w-fit rounded-lg p-2'
          >
            <FilterX className='h-4 w-4 text-rose-600' />
          </Button>
          <Button
            onClick={() => formRef.current?.requestSubmit()}
            size='icon'
            variant='secondary'
            className='h-fit w-fit rounded-lg p-2'
          >
            <Search className='h-4 w-4' />
          </Button>
        </div>
        <AccordionItem value='item-1' className='border-b-0'>
          <AccordionTrigger hideDownArrowIcon className='text-lg font-medium hover:no-underline'>
            Filter Blog Posts
          </AccordionTrigger>

          <AccordionContent>
            <PostFilterForm
              form={form}
              mutation={mutation}
              formRef={formRef}
              setValues={setValues}
            />
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <FilterPostResults
        data={data}
        isPending={mutation.isPending || mutation.isLoading || mutation.isFetching}
      />

      <div className='mt-8 flex w-full items-center justify-center'>
        <Button
          disabled={
            !mutation.hasNextPage || mutation.isPending || mutation.isLoading || mutation.isFetching
          }
          onClick={() => {
            if (mutation.hasNextPage && !mutation.isPending) {
              mutation.fetchNextPage();
            }
          }}
          variant='secondary'
          className='w-full max-w-xs font-semibold'
        >
          Load More
        </Button>
      </div>
    </div>
  );
};

export default FilteredPosts;
