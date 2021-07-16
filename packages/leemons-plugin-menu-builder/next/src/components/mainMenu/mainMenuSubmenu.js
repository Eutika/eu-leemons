import * as _ from 'lodash';
import { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDrop } from 'react-dnd';
import MainMenuCloseSubmenuBtn from './mainMenuCloseSubmenuBtn';
import MainMenuSubmenuItem from './mainMenuSubmenuItem';
import SimpleBar from 'simplebar-react';
import update from 'immutability-helper';
import DndSortItem from '../dnd/dndSortItem';
import DndDropZone from '../dnd/dndDropZone';
import { addMenuItemRequest, reOrderCustomUserItemsRequest } from '../../request';
import hooks from 'leemons-hooks';
import { registerDndLayer } from '../dnd/dndLayer';

export default function MainMenuSubmenu({ item, onClose, activeItem }) {
  const [customChildrens, setCustomChildrens] = useState(item ? item.customChildrens : []);

  const find = useCallback(
    (id) => {
      const dragItem = _.find(customChildrens, { id });
      return { dragItem, index: customChildrens.indexOf(dragItem) };
    },
    [customChildrens]
  );

  const move = useCallback(
    async (id, atIndex, isLast) => {
      if (_.isString(id)) {
        const { dragItem, index } = find(id);
        const newCustomChildrens = update(customChildrens, {
          $splice: [
            [index, 1],
            [atIndex, 0, dragItem],
          ],
        });
        setCustomChildrens(newCustomChildrens);
        if (isLast) {
          await reOrderCustomUserItemsRequest(
            'plugins.menu-builder.main',
            item.key,
            _.map(newCustomChildrens, 'id')
          );
        }
      } else {
        const { dragItem, index } = find('new-item');
        if (dragItem) {
          setCustomChildrens(
            update(customChildrens, {
              $splice: [
                [index, 1],
                [atIndex, 0, dragItem],
              ],
            })
          );
        } else {
          setCustomChildrens(
            update(customChildrens, {
              $push: [{ ...id, id: 'new-item' }],
            })
          );
        }
      }
    },
    [customChildrens, setCustomChildrens]
  );

  const onDrop = async (droppedItem) => {
    console.log('onDrop');
    const { menuItem } = await addMenuItemRequest({ ...droppedItem, parentKey: item.key });
    await hooks.fireEvent('menu-builder:user:addCustomItem', menuItem);
  };

  const onCancel = (dragItem) => {
    console.log(dragItem, customChildrens);
  };

  const [, drop] = useDrop(() => ({ accept: 'menu-item-sort' }));

  useEffect(() => {
    hooks.addAction('dnd:cancel', onCancel);
    return () => {
      hooks.removeAction('dnd:cancel', onCancel);
    };
  });

  useEffect(() => {
    registerDndLayer('menu-item-sort', ({ item: _item }) => (
      <MainMenuSubmenuItem item={find(_item.id).dragItem} isLayer={true} />
    ));
  }, [find]);

  useEffect(() => {
    if (item) setCustomChildrens(item.customChildrens);
  }, [item]);

  return (
    <>
      {item && (
        <div className="w-full h-screen bg-secondary-400 flex flex-col justify-between">
          {/* Header submenu */}
          <div
            style={{ marginBottom: '34px' }}
            className={'flex flex-row justify-between items-center pt-3'}
          >
            <div className={'w-full pl-6 font-lexend text-base text-white '}>{item.label}</div>
            {/* Close submenu */}
            <div className={'px-2'}>
              <MainMenuCloseSubmenuBtn onClick={onClose} />
            </div>
          </div>
          {/* Items submenu */}
          <DndDropZone type={'menu-item'} onDrop={onDrop} className="flex-grow h-px">
            {() => (
              <SimpleBar className="h-full">
                {item.childrens.map((child) => (
                  <MainMenuSubmenuItem
                    key={child.id}
                    item={child}
                    active={activeItem?.id === child.id}
                  />
                ))}

                <div ref={drop}>
                  <>
                    {customChildrens.map((child) => (
                      <DndSortItem
                        key={child.id}
                        id={child.id}
                        find={find}
                        move={move}
                        type={'menu-item-sort'}
                        accept={['menu-item-sort', 'menu-item']}
                        emptyLayout={true}
                      >
                        {({ isDragging }) => (
                          <MainMenuSubmenuItem
                            item={child}
                            isDragging={isDragging}
                            active={activeItem?.id === child.id}
                          />
                        )}
                      </DndSortItem>
                    ))}
                  </>
                </div>
              </SimpleBar>
            )}
          </DndDropZone>
        </div>
      )}
    </>
  );
}

MainMenuSubmenu.propTypes = {
  item: PropTypes.object,
  onClose: PropTypes.func,
  activeItem: PropTypes.object,
};
