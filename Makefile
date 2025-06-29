# Surely there is a better way do this...
SRCS = $(wildcard src/*.cc) \
	deps/free42/common/shell_spool.cc deps/free42/common/core_main.cc deps/free42/common/core_commands1.cc deps/free42/common/core_commands2.cc \
	deps/free42/common/core_commands3.cc deps/free42/common/core_commands4.cc deps/free42/common/core_commands5.cc \
	deps/free42/common/core_commands6.cc deps/free42/common/core_commands7.cc deps/free42/common/core_display.cc deps/free42/common/core_globals.cc \
	deps/free42/common/core_helpers.cc deps/free42/common/core_keydown.cc deps/free42/common/core_linalg1.cc deps/free42/common/core_linalg2.cc \
	deps/free42/common/core_math1.cc deps/free42/common/core_math2.cc deps/free42/common/core_phloat.cc deps/free42/common/core_sto_rcl.cc \
	deps/free42/common/core_tables.cc deps/free42/common/core_variables.cc

# Copied deps/free42/common/from free42 makefile
CFLAGS += -Wall \
	 -Wno-parentheses \
	 -Wno-sign-compare \
	 -Wno-format-truncation \
	 -Wno-unknown-pragmas \
	 -DDECIMAL_CALL_BY_REFERENCE=1 \
	 -DDECIMAL_GLOBAL_ROUNDING=1 \
	 -DDECIMAL_GLOBAL_ROUNDING_ACCESS_FUNCTIONS=1 \
	 -DDECIMAL_GLOBAL_EXCEPTION_FLAGS=1 \
	 -DDECIMAL_GLOBAL_EXCEPTION_FLAGS_ACCESS_FUNCTIONS=1 \
	 -DHAVE_SINCOS=1 \
	 -DF42_BIG_ENDIAN \
	 -DBID_BIG_ENDIAN \
	 -fno-exceptions \
	 -fno-rtti \
	 -D_WCHAR_T_DEFINED \
	 -DBCD_MATH

LIBS = gcc111libbid.a

ifneq "$(findstring 6162,$(shell echo ab | od -x))" ""
CFLAGS += -DF42_BIG_ENDIAN -DBID_BIG_ENDIAN
endif

gcc111libbid.a:
	cd deps/free42/gtk && sh ./build-intel-lib.sh
	cp deps/free42/gtk/gcc111libbid.a .

build: gcc111libbid.a
	mkdir -p out
	$(CXX) $(CFLAGS) -o out/main $(SRCS) $(LIBS)

clean:
	rm -f gcc111libbid.a out/main
	rm -rf out

.PHONY: build clean
