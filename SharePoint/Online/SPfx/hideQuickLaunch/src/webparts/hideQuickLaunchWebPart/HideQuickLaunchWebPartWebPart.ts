import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './HideQuickLaunchWebPartWebPart.module.scss';
import * as strings from 'HideQuickLaunchWebPartWebPartStrings';

export interface IHideQuickLaunchWebPartWebPartProps {
  description: string;
}

import 'jQuery';
declare var $;

export default class HideQuickLaunchWebPartWebPart extends BaseClientSideWebPart<IHideQuickLaunchWebPartWebPartProps> {

  public render(): void {
    require('./App.js');    
    this.domElement.innerHTML = `<div id="divHideQuickLaunch" style="display:none" >Webpart loaded</div>`;
    // this.domElement.innerHTML = `
    //   <div class="${ styles.hideQuickLaunchWebPart }">
    //     <div class="${ styles.container }">
    //       <div class="${ styles.row }">
    //         <div class="${ styles.column }">
    //           <span class="${ styles.title }">Welcome to SharePoint!</span>
    //           <p class="${ styles.subTitle }">Customize SharePoint experiences using Web Parts.</p>
    //           <p class="${ styles.description }">${escape(this.properties.description)}</p>
    //           <a href="https://aka.ms/spfx" class="${ styles.button }">
    //             <span class="${ styles.label }">Learn more</span>
    //           </a>
    //         </div>
    //       </div>
    //     </div>
    //   </div>`;
    $().hideQuickLaunch();
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
