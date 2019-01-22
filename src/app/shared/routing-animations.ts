import {
  trigger,
  transition,
  style,
  query,
  group,
  animate
} from '@angular/animations';

export const routerSlideInStateTrigger = trigger('routerSlideInState', [
  transition('new => past', [
    query(
      ':enter, :leave',
      [
        style({
          position: 'fixed',
          width: '100%',
          height: '100%'
        })
      ],
      { optional: true }
    ),
    group([
      query(
        ':enter',
        [
          style({
            transform: 'translateX(100%)'
          }),

          animate(
            '500ms ease-in-out',
            style({
              transform: 'translateX(0%)'
            })
          )
        ],
        { optional: true }
      ),
      query(
        ':leave',
        [
          style({
            transform: 'translateX(0%)'
          }),
          animate(
            '500ms ease-in-out',
            style({
              transform: 'translateX(-100%)'
            })
          )
        ],
        { optional: true }
      )
    ])
  ]),
  transition('past => new', [
    query(
      ':enter, :leave',
      style({
        position: 'fixed',
        width: '100%',
        height: '100%'
      }),
      { optional: true }
    ),
    group([
      query(
        ':enter',
        [
          style({
            transform: 'translateX(-100%)'
          }),
          animate(
            '500ms ease-in-out',
            style({
              transform: 'translateX(0%)'
            })
          )
        ],
        { optional: true }
      ),
      query(
        ':leave',
        [
          style({
            transform: 'translateX(0%)'
          }),
          animate(
            '500ms ease-in-out',
            style({
              transform: 'translateX(100%)'
            })
          )
        ],
        { optional: false }
      )
    ])
  ])
]);
