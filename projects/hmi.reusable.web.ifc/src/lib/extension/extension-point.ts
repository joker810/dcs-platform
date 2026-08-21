export interface ExtensionPoint<T> {

    id: string;

    name: string;

    description?: string;

}

//generic type ,becoz extension point can be of any type, so we are using generic type here.ex: differenet payload shell.ui , shell.menu etc