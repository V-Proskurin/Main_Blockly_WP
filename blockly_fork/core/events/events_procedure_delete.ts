
/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import type {IProcedureModel} from '../interfaces/i_procedure_model.js';
import {ObservableProcedureModel} from '../procedures.js';
import * as registry from '../registry.js';
import type {Workspace} from '../workspace.js';

import {ProcedureBase} from './events_procedure_base.js';
import * as eventUtils from './utils.js';


/**
 * Represents a procedure data model being deleted.
 */
export class ProcedureDelete extends ProcedureBase {
  /** A string used to check the type of the event. */
  type = eventUtils.PROCEDURE_DELETE;

  constructor(workspace: Workspace, model: IProcedureModel) {
    super(workspace, model);
  }

  run(forward: boolean) {
    const workspace = this.getEventWorkspace_();
    const procedureMap = workspace.getProcedureMap();
    const procedureModel = procedureMap.get(this.model.getId());
    if (forward) {
      if (!procedureModel) return;
      procedureMap.delete(this.model.getId());
    } else {
      if (procedureModel) return;
      procedureMap.add(new ObservableProcedureModel(
          workspace, this.model.getName(), this.model.getId()));
    }
  }
}

registry.register(
    registry.Type.EVENT, eventUtils.PROCEDURE_DELETE, ProcedureDelete);
