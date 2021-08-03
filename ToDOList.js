        let tarInput = document.getElementById("tarefa");
        let repInput = document.getElementById("reponsavel")
        let prazoInput = document.getElementById("prazo");
        let addButton = document.getElementsByTagName("button")[0];
        let lista = document.getElementById("lista");
        let lsitaFazendo = document.getElementById("fazendo");

       let NovoElementoTarefa = function (taskString) {
            let listItem = document.createElement("li");
            let checkBox = document.createElement("input");
              checkBox.type="checkbox";
            let label = document.createElement("label");
            label.innerText = taskString;
            let editInputRes = document.createElement('input');
                editInputRes.type = 'text'
                editInputRes.className="editRes"
            let editInputTarefa = document.createElement('input');
                editInputTarefa.type = 'text'
                editInputTarefa.className="editTarefa"
            let editInputPra= document.createElement('input');
                editInputPra.type = 'date'
                editInputPra.className="editPra"
            let deletButton = document.createElement("button");
            deletButton.innerText = 'X';
            deletButton.className = 'delete';
            let editButton = document.createElement("button");
             editButton.innerText="Editar";
             editButton.className="edit"

            listItem.appendChild(checkBox);
            listItem.appendChild(label);
            listItem.appendChild(editInputTarefa);
            listItem.appendChild(editInputRes);
            listItem.appendChild(editInputPra);
            listItem.appendChild(editButton);
            listItem.appendChild(deletButton);
            return listItem;
        }

       let AddTarefa = function(){
           let TarefaResposavelPraso = tarInput.value + ", " + repInput.value + ", " + prazoInput.value + " ";
           let listItem = NovoElementoTarefa(TarefaResposavelPraso);
            lista.appendChild(listItem);
            vincularTarefa(listItem, AddFazendo);

            
        }

        let EditTarefa = function(){
            console.log("teste")
            let listItem=this.parentNode;
            let editInputTarefa= listItem.querySelector('input[type=text]');
            let editInputRes= listItem.querySelector('input.editRes');
            let editInputPra= listItem.querySelector('input[type=date]');
            
            let label = listItem.querySelector("label");
            let containsClass = listItem.classList.contains("editMode");

            console.log(containsClass);

            if(containsClass) {
                let TarefaResposavelPraso =  editInputTarefa.value+", "+editInputRes.value+ ", " + editInputPra.value + " ";
                label.innerText= TarefaResposavelPraso ;
               editInputTarefa.value="";
               editInputRes.value="";
               editInputPra.value="";

               console.log(TarefaResposavelPraso);
            }else{
                label.innerText="";
                editInputTarefa.value = label.innerText;
            }

            

            listItem.classList.toggle("editMode");
        }

       let deleteTarefa = function(){
           let listItem = this.parentNode;
           let ul = listItem.parentNode;
            ul.removeChild(listItem);
        }

       let AddFazendo = function(){
           let listItem = this.parentNode;
            //var ul = listItem.parentNode;
            //insertButton.parentNode.removeChild(insertButton);
            lsitaFazendo.appendChild(listItem);
            vincularTarefa(listItem, tarefaAfazer);
        }

        let tarefaAfazer = function(){
            let listItem = this.parentNode;
            lista.appendChild(listItem);
            vincularTarefa(listItem, AddFazendo);
        }

      let vincularTarefa = function(taskListItem, taskEstatus){
        let checkBox = taskListItem.querySelector("input[type=checkbox]");
        let editButton = taskListItem.querySelector("button.edit");
        let deletButton = taskListItem.querySelector("button.delete");


        editButton.onclick = EditTarefa;
        deletButton.onclick = deleteTarefa;

        checkBox.onchange=taskEstatus;
      }



        addButton.addEventListener("click", AddTarefa);

        for(let i=0; i<lista.children.length; i++){

            vincularTarefa(lista.children[i], AddFazendo);
        }   

        for(let i=0; i<lsitaFazendo.children.length; i++){

            vincularTarefa(lsitaFazendo.children[i], tarefaAfazer);
        }

      
