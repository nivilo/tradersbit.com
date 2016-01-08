import { AuthApi } from '../../services/auth-api/auth-api'

/** @ngInject */
export function tbPublish(): angular.IDirective {

  return {
    restrict: 'E',
    scope: {},
    templateUrl: 'app/comp-top/publish/publish.html',
    controller: TbPublishCtrl,
    controllerAs: 'ctrl',
    bindToController: {
    }
  };

}

/** @ngInject */
export class TbPublishCtrl {

  constructor(private authApi: AuthApi) { }
  
  signOut() {
    this.authApi.signOut()
  }
}