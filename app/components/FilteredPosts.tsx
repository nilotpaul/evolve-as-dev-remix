import { FilterX, Search } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import { Button } from './ui/button';
import PostFilterForm from './forms/PostFilterForm';
import { useRef } from 'react';
import FilterPostResults from './FilterPostResults';
import { useFilterPosts } from '~/hooks/useFilterPosts';
import { useLoaderData } from '@remix-run/react';
import { TrendingPost } from '~/types/blog-types';

const FilteredPosts = () => {
  const formRef = useRef<HTMLFormElement | null>(null);

  const { trendingPosts } = useLoaderData<{ trendingPosts: TrendingPost[] }>();

  const [form, mutation] = useFilterPosts(trendingPosts);

  return (
    <div className='space-y-12'>
      <Accordion
        type='single'
        defaultValue='item-1'
        className='relative w-full rounded-md bg-muted/60 px-5'
      >
        <div className='absolute right-5 top-3 space-x-2'>
          <Button size='icon' variant='ghost' className='h-fit w-fit rounded-lg p-2'>
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
            <PostFilterForm form={form} mutation={mutation} formRef={formRef} />
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <FilterPostResults filteredPosts={mutation.data} />
    </div>
  );
};

export default FilteredPosts;
