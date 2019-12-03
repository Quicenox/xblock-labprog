"""TO-DO: Write a description of what this XBlock is."""

import pkg_resources
from xblock.core import XBlock
from xblock.fields import Integer, Scope, String, Boolean, List
from xblock.fragment import Fragment


@XBlock.needs("user")
@XBlock.wants("user")
class LabProgXBlock(XBlock):
    """
    TO-DO: document what your XBlock does.
    """

    nombre = String(help="Usuario de EDX", default=None, scope=Scope.user_state)
    user_email = []
    user_fullname = String(help="Full name de usuario de EDX", default=None, scope=Scope.user_state)
    course_id = String(help="Id del curso", default=None)
    id_usuario = String(help="id del usuario", default=None, scope=Scope.user_state)


    # TO-DO: delete count, and define your own fields.
    count = Integer(
        default=0, scope=Scope.user_state,
        help="A simple counter, to show something happening",
    )

    def resource_string(self, path):
        """Handy helper for getting resources from our kit."""
        data = pkg_resources.resource_string(__name__, path)
        return data.decode("utf8")

    # TO-DO: change this view to display your data your own way.
    def student_view(self, context=None):
        """
        The primary view of the LabProgXBlock, shown to students
        when viewing courses.
        """

        html = self.resource_string("static/html/labprog.html")
        frag = Fragment(html.format(self=self))
        frag.add_css(self.resource_string("static/css/labprog.css"))
        frag.add_javascript_url(
            "https://cdnjs.cloudflare.com/ajax/libs/ace/1.4.2/ace.js")
        frag.add_javascript(self.resource_string("static/js/src/labprog.js"))
        frag.add_javascript(self.resource_string(
            "static/js/src/src-min-noconflict/ace.js"))
        frag.initialize_js('LabProgXBlock')

        return frag

    # TO-DO: change this handler to perform your own actions.  You may need more
    # than one handler, or you may not need any handlers at all.
    @XBlock.json_handler
    def show_user_data(self, data, suffix=''):
        user_service = self.runtime.service(self, 'user')
        xb_user = user_service.get_current_user()

        self.nombre = xb_user.opt_attrs.get('edx-platform.username')
        self.user_fullname = xb_user.full_name
        self.user_email = xb_user.emails[0]
        self.id_usuario = xb_user.opt_attrs.get('edx-platform.user_id')

        return {"nombre": self.nombre, "email": self.user_email, "fullName": self.user_fullname, "idUser": self.id_usuario}

    # TO-DO: change this to create the scenarios you'd like to see in the
    # workbench while developing your XBlock.
    @staticmethod
    def workbench_scenarios():
        """A canned scenario for display in the workbench."""
        return [
            ("LabProgXBlock",
             """<labprog/>
             """),
            ("Multiple LabProgXBlock",
             """<vertical_demo>
                <labprog/>
                <labprog/>
                <labprog/>
                </vertical_demo>
             """),
        ]
