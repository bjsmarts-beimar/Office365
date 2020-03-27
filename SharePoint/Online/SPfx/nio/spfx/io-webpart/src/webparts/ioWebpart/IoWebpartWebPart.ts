import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './IoWebpartWebPart.module.scss';
import * as strings from 'IoWebpartWebPartStrings';

export interface IIoWebpartWebPartProps {
  description: string;
}

export default class IoWebpartWebPart extends BaseClientSideWebPart<IIoWebpartWebPartProps> {

  public render(): void {
    this.domElement.innerHTML = `
      <div class="${ styles.ioWebpart }">
        <div class="${ styles.container }">
          <div class="${ styles.row }">
            <div class="${ styles.column }">
              
              <h1 class="${ styles.blueColor }">Infrastructure Operations</h1>
              <p>As the Agency as a whole seeks to standardize operations and redefine processes to become more agile and adaptable to meet the needs of beneficiaries and providers, our IT infrastructure and support functions must become equally agile and adaptable as change happens.  Infrastructure Operation’s overall goal is support the components requires for proper operation of repository for storage, management and dissemination of data organized around the Agency Enterprise by facilitating the secure presentation and receipt of data.</p>

              <table border="1">
              <tr>
                  <td>
                      <img src="/sites/netadmins/SiteAssets/nio/images/network.png">    
                      <h3>Core Infrastructure Services</h3>
              
                      <ul>
                          <li>
                          <h4><a href="https://schhs.sharepoint.com/sites/netadmins/Vendor%20Management/Forms/AllItems.aspx">Vendor Management</a></h4> 
                          </li>
                          <li>
                          <h4><a href="https://schhs.sharepoint.com/sites/netadmins/Build%20Guides/Forms/AllItems.aspx?viewid=eb6bfd2c%2D4f96%2D4f9e%2D8e10%2D1049c60ab19d&id=%2Fsites%2Fnetadmins%2FBuild%20Guides%2FCore%20Infrastructure">Build Guides</a></h4>
                          </li>
                          <li>
                          <h4><a href="https://schhs.sharepoint.com/sites/netadmins/Storage/Forms/AllItems.aspx">Storage</a></h4> 
                          </li>
                          <li>
                          <h4><a href="https://schhs.sharepoint.com/sites/netadmins/Training%20and%20Guides/Forms/AllItems.aspx">Training and Guides</a></h4> 
                          </li>
                      </ul>
                  </td>
                  <td>
                      <img src="/sites/netadmins/SiteAssets/nio/images/cables.png">
                      <h3>Network Services</h3>
                      <ul>
                          <li>
                          <h4><a href="https://schhs.sharepoint.com/sites/netadmins/Vendor%20Management/Forms/AllItems.aspx">Vendor Management</a></h4> 
                          </li>
                          <li>
                          <h4><a href="https://schhs.sharepoint.com/sites/netadmins/Build%20Guides/Forms/AllItems.aspx?viewid=eb6bfd2c%2D4f96%2D4f9e%2D8e10%2D1049c60ab19d&id=%2Fsites%2Fnetadmins%2FBuild%20Guides%2FCore%20Infrastructure">Build Guides</a></h4>
                          </li>
                          <li>
                          <h4><a href="https://schhs.sharepoint.com/sites/netadmins/Storage/Forms/AllItems.aspx">Storage</a></h4> 
                          </li>
                          <li>
                          <h4><a href="https://schhs.sharepoint.com/sites/netadmins/Training%20and%20Guides/Forms/AllItems.aspx">Training and Guides</a></h4> 
                          </li>
                      </ul>
                  </td>
                  <td>
                      <h3>Network Administration</h3>
                      <img src="/sites/netadmins/SiteAssets/nio/images/infra-net.png">
                  </td>
              </tr>
              </table>

              <br><br>
              <table border="1" bgcolor="blue" width="100%">
              <tr>
                  <td class="${ styles.whiteColor }" valign="top">
                      <h4>IO Team (Link to Org Chart slide 2)</h4>
                      <ul>
                          <li class="${ styles.whiteColor }"><a class="${ styles.whiteColor }" href="https://schhs.sharepoint.com/sites/netadmins/Lists/DCS Contact List/AllItems.aspx">IO Contact List</a></li>
                      </ul>
                  </td>
                  <td class="${ styles.whiteColor }" valign="top">
                      <h4>Policies and Procedures</h4>
                      <ul>
                          <li class="${ styles.whiteColor }"><a class="${ styles.whiteColor }" href="https://schhs.sharepoint.com/sites/netadmins/Lists/Policies/AllItems.aspx?viewpath=%2Fsites%2Fnetadmins%2FLists%2FPolicies%2FAllItems.aspx">Policies</a></li>
                          <li class="${ styles.whiteColor }"><a class="${ styles.whiteColor }" href="https://schhs.sharepoint.com/sites/netadmins/Procedures/Forms/AllItems.aspx">Procedures</a></li>
                      </ul>
                  </td>
                  <td class="${ styles.whiteColor }">
                      <h4>Resources</h4>
                      <ul>
                          <li class="${ styles.whiteColor }"><a class="${ styles.whiteColor }" href="https://schhs.sharepoint.com/sites/netadmins/Lists/DCS Contact List/AllItems.aspx">IO Contact List</a></li>
                          <li class="${ styles.whiteColor }"><a class="${ styles.whiteColor }" href="https://schhs.sharepoint.com/sites/netadmins/Lists/DCS Calendar/calendar.aspx">IO Calendar</a></li>
                          <li class="${ styles.whiteColor }"><a class="${ styles.whiteColor }" href="https://schhs.sharepoint.com/sites/netadmins/IO%20POAMs/Forms/AllItems.aspx?viewpath=%2Fsites%2Fnetadmins%2FIO%20POAMs%2FForms%2FAllItems.aspx">IO POAMs</a></li>
                          <li class="${ styles.whiteColor }"><a class="${ styles.whiteColor }" href="https://schhs.sharepoint.com/sites/netadmins/Archived%20Documentation/Forms/AllItems.aspx?viewpath=%2Fsites%2Fnetadmins%2FArchived%20Documentation%2FForms%2FAllItems">Archived Documentation</a></li>
                      </ul>
                  </td>
              </tr>
              </table>

            </div>
          </div>
        </div>
      </div>`;
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
