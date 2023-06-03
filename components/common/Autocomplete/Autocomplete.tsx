import React, { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';

import { getAlgoliaResults } from '@algolia/autocomplete-preset-algolia';
import { Hit } from '@algolia/client-search';
import { Avatar } from '@material-ui/core';
import algoliasearch from 'algoliasearch/lite';
import {
  AutocompleteOptions,
  AutocompleteState,
  createAutocomplete,
} from '@algolia/autocomplete-core';

import { useStyles } from './autocomplete.style';
import clsx from 'clsx';

const searchClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID || '',
  process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY || ''
);

type AutocompleteItem = Hit<{
  objectID: string;
  title: string;
  content: string;
  updatedAt: string;
  Tags: [{ tagName: string }];
  User: {
    loginID: string;
    avatarUrl: string;
    positionType: string;
    deletedAt: string | null;
  };
  id: number;
  thumbnail: string;
  UserId: number;
  createdAt: string;
  deletedAt: string | null;
  LikeDisLike: [{ actionType: string; UserId: number }];
}>;

export function Autocomplete(props: Partial<AutocompleteOptions<AutocompleteItem>>) {
  const classes = useStyles();

  const [autocompleteState, setAutocompleteState] = useState<
    AutocompleteState<AutocompleteItem>
  >({
    collections: [],
    completion: null,
    context: {},
    isOpen: false,
    query: '',
    activeItemId: null,
    status: 'idle',
  });

  const autocomplete = useMemo(
    () =>
      createAutocomplete<
        AutocompleteItem,
        React.BaseSyntheticEvent,
        React.MouseEvent,
        React.KeyboardEvent
      >({
        onStateChange({ state }) {
          setAutocompleteState(state);
        },
        getSources() {
          return [
            {
              sourceId: 'develogger-post',
              getItems({ query }) {
                return getAlgoliaResults({
                  searchClient,
                  queries: [
                    {
                      indexName: 'develogger-post',
                      query,
                      params: {
                        hitsPerPage: 300,
                        highlightPreTag: '<mark style="background-color: yellow;">',
                        highlightPostTag: '</mark>',
                      },
                    },
                  ],
                });
              },
              getItemUrl({ item }) {
                return `${process.env.NEXT_PUBLIC_API_URL}/blog/${item.User.loginID}/${item.id}`;
              },
            },
          ];
        },
        ...props,
      }),
    [props]
  );

  const inputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const { getEnvironmentProps } = autocomplete;

  useEffect(() => {
    if (!formRef.current || !panelRef.current || !inputRef.current) {
      return undefined;
    }

    const { onTouchStart, onTouchMove } = getEnvironmentProps({
      formElement: formRef.current,
      inputElement: inputRef.current,
      panelElement: panelRef.current,
    });

    window.addEventListener('touchstart', onTouchStart);
    window.addEventListener('touchmove', onTouchMove);

    return () => {
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
    };
  }, [getEnvironmentProps, formRef, inputRef, panelRef]);

  return (
    <div className="aa-Autocomplete" {...autocomplete.getRootProps({})}>
      <form
        ref={formRef}
        className="aa-Form"
        {...autocomplete.getFormProps({ inputElement: inputRef.current })}
      >
        <div className="aa-InputWrapperPrefix">
          <label className="aa-Label" {...autocomplete.getLabelProps({})}>
            <button className="aa-SubmitButton" type="submit" title="Submit">
              <SearchIcon />
            </button>
          </label>
        </div>
        <div className="aa-InputWrapper">
          <input
            className="aa-Input"
            ref={inputRef}
            {...autocomplete.getInputProps({ inputElement: inputRef.current })}
          />
        </div>
        <div className="aa-InputWrapperSuffix">
          <button className="aa-ClearButton" title="Clear" type="reset">
            <ClearIcon />
          </button>
        </div>
      </form>

      {autocompleteState.isOpen && (
        <div
          ref={panelRef}
          className={[
            'aa-Panel',
            'aa-Panel--desktop',
            autocompleteState.status === 'stalled' && 'aa-Panel--stalled',
          ]
            .filter(Boolean)
            .join(' ')}
          {...autocomplete.getPanelProps({})}
        >
          <div className="aa-PanelLayout aa-Panel--scrollable">
            {autocompleteState.collections.map((collection, index) => {
              const { source, items } = collection;

              return (
                <section key={`source-${index}`} className="aa-Source">
                  {items.length > 0 && (
                    <ul className="aa-List" {...autocomplete.getListProps()}>
                      {items.map((item) => {
                        return (
                          <Link
                            href={`/blog/${item.User.loginID}/${item.id}`}
                            as={`/blog/${item.User.loginID}/${item.id}`}
                            key={item.objectID}
                          >
                            <a>
                              <li
                                className="aa-Item"
                                {...autocomplete.getItemProps({ item, source })}
                              >
                                <div className="aa-ItemWrapper">
                                  <div className="aa-ItemContent">
                                    <div className="aa-ItemIcon aa-ItemIcon--picture aa-ItemIcon--alignTop">
                                      <img
                                        src={`${process.env.NEXT_PUBLIC_API_URL}/${item.thumbnail}`}
                                        alt={item.title}
                                        width="40"
                                        height="40"
                                      />
                                    </div>
                                    <div className="aa-ItemContentBody">
                                      <div
                                        className="aa-ItemContentTitle"
                                        dangerouslySetInnerHTML={{
                                          __html:
                                            item._highlightResult!.title!.value,
                                        }}
                                      />
                                      <div
                                        className="aa-ItemContentTitle"
                                        dangerouslySetInnerHTML={{
                                          __html:
                                            item._highlightResult!.content!.value,
                                        }}
                                      />
                                      <div
                                        className={clsx(
                                          'aa-ItemContentDescription',
                                          classes.writerInfoContainer
                                        )}
                                      >
                                        <Avatar
                                          color="default"
                                          alt="User Profile Icon"
                                          src={`${item.User.avatarUrl || ''}`}
                                          className={classes.avatar}
                                        />
                                        <strong className={classes.loginId}>
                                          {item.User.loginID}
                                        </strong>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="aa-ItemActions">
                                    <button
                                      className={clsx(
                                        'aa-ItemActionButton',
                                        'aa-DesktopOnly',
                                        'aa-ActiveOnly',
                                        classes.actionButton
                                      )}
                                      type="button"
                                      title="Select"
                                    >
                                      <svg fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M18.984 6.984h2.016v6h-15.188l3.609 3.609-1.406 1.406-6-6 6-6 1.406 1.406-3.609 3.609h13.172v-4.031z" />
                                      </svg>
                                    </button>
                                  </div>
                                </div>
                              </li>
                            </a>
                          </Link>
                        );
                      })}
                    </ul>
                  )}
                </section>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

function ClearIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" {...props}>
      <path
        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
        fillRule="evenodd"
        clipRule="evenodd"
      />
    </svg>
  );
}

function SearchIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" {...props}>
      <path
        d="M14.386 14.386l4.0877 4.0877-4.0877-4.0877c-2.9418 2.9419-7.7115 2.9419-10.6533 0-2.9419-2.9418-2.9419-7.7115 0-10.6533 2.9418-2.9419 7.7115-2.9419 10.6533 0 2.9419 2.9418 2.9419 7.7115 0 10.6533z"
        fill="none"
        fillRule="evenodd"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.4"
      />
    </svg>
  );
}
