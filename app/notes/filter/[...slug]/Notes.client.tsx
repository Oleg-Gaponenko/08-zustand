'use client';

import { useState } from 'react';
import css from './Notes.module.css';
import SearchBox from '../../../../components/SearchBox/SearchBox';
import NoteList from '../../../../components/NoteList/NoteList';
import Pagination from '../../../../components/Pagination/Pagination';
import { useDebounce } from 'use-debounce';
import { fetchNotes, type NoteHubResponse } from '../../../../lib/api';
import { useQuery } from '@tanstack/react-query';
import Loader from '../../../../components/Loader/Loader';
import ErrorMessage from '../../../../components/ErrorMessage/ErrorMessage';
import AbsentDataMessage from '../../../../components/AbsentDataMessage/AbsentDataMessage';
import { NoteTag } from '@/types/note';
import Modal from '@/components/Modal/Modal';
import NoteForm from '@/components/NoteForm/NoteForm';

interface NotesClientProps {
  initialData: NoteHubResponse;
  tag?: NoteTag;
}

export default function NotesClient({ initialData, tag }: NotesClientProps) {
  const [searchNote, setSearchNote] = useState('');
  const [debouncedSearch] = useDebounce(searchNote, 500);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const notesPerPage = 12;

  const { data, isLoading, isError, error } = useQuery<NoteHubResponse, Error>({
    queryKey: [
      'notes',
      tag ?? 'all',
      debouncedSearch,
      currentPage,
      notesPerPage,
    ],
    queryFn: () =>
      fetchNotes({
        search: debouncedSearch,
        page: currentPage,
        perPage: notesPerPage,
        tag,
      }),
    placeholderData: previousData => previousData,
    initialData,
  });

  const totalPages = data?.totalPages ?? 1;

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={searchNote} onChange={setSearchNote} />
        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            onPageChange={setCurrentPage}
            totalPages={data.totalPages}
          />
        )}
        <button className={css.button} onClick={() => setIsModalOpen(true)}>
          Create note +
        </button>
      </header>
      {isLoading && <Loader />}
      {isError && error && <ErrorMessage message={error.message} />}
      {data && data?.notes.length > 0 && <NoteList notes={data.notes} />}
      {!isLoading && !isError && data && data?.notes.length === 0 && (
        <AbsentDataMessage />
      )}

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <NoteForm onCancel={() => setIsModalOpen(false)} />
        </Modal>
      )}
    </div>
  );
}
