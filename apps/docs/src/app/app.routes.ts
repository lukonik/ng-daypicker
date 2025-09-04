import { Route } from '@angular/router';
import { SimpleLayoutComponent, LayoutComponent } from './components/layout';
import { 
  HomeComponent,
  IntroductionComponent,
  SingleSelectionComponent,
  MultipleSelectionComponent,
  RangeSelectionComponent,
  ApiComponent,
  ThemingComponent
} from './pages';

export const appRoutes: Route[] = [
  // Home page with simple layout
  {
    path: '',
    component: SimpleLayoutComponent,
    children: [
      {
        path: '',
        component: HomeComponent
      }
    ]
  },
  
  // Documentation pages with sidebar layout
  {
    path: 'docs',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'introduction',
        pathMatch: 'full'
      },
      {
        path: 'introduction',
        component: IntroductionComponent
      },
      {
        path: 'single-selection',
        component: SingleSelectionComponent
      },
      {
        path: 'multiple-selection',
        component: MultipleSelectionComponent
      },
      {
        path: 'range-selection',
        component: RangeSelectionComponent
      },
      {
        path: 'api',
        component: ApiComponent
      },
      {
        path: 'theming',
        component: ThemingComponent
      }
    ]
  },
  
  // Fallback redirect
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];
